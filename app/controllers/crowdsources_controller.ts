import User from '#models/user'
import City from '#models/city'
import Sector from '#models/sector'
import AgeGroup from '#models/age_group'
import Education from '#models/education'
import JobFamily from '#models/job_family'
import Experience from '#models/experience'
import db from '@adonisjs/lucid/services/db'
import CompanyType from '#models/company_type'
import ContractTerm from '#models/contract_term'
import type { HttpContext } from '@adonisjs/core/http'
import CrowdsourceData from '#models/crowdsource_datum'
import CrowdsourceTargets from '#models/crowdsource_target'
import { storeValidator, targetsValidator } from '#validators/crowdsource'

export default class CrowdsourcesController {
  async index({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const query = request.only([
        'page',
        'city',
        'sector',
        'industry',
        'contract',
        'education',
        'age_group',
        'job_family',
        'experience',
      ])
      const page = query.page ?? 1
      const data = await CrowdsourceData.findByOrFail('created_by', user.id)

      let userCredits
      let csQuery = CrowdsourceData.query().where('country_id', data.countryId)

      if (user.credits > 0) {
        if (query.city) {
          const city = await City.findOrFail(query.city)
          csQuery = csQuery.where('city_id', city.id)
        }
        if (query.sector) {
          const sector = await Sector.findOrFail(query.sector)
          csQuery = csQuery.where('sector_id', sector.id)
        }
        if (query.age_group) {
          const ageGroup = await AgeGroup.findOrFail(query.age_group)
          csQuery = csQuery.where('age_id', ageGroup.id)
        }
        if (query.industry) {
          const industry = await CompanyType.findOrFail(query.industry)
          csQuery = csQuery.where('company_type_id', industry.id)
        }
        if (query.education) {
          const education = await Education.findOrFail(query.education)
          csQuery = csQuery.where('education_id', education.id)
        }
        if (query.job_family) {
          const jobFamily = await JobFamily.findOrFail(query.job_family)
          csQuery = csQuery.where('job_family_id', jobFamily.id)
        }
        if (query.contract) {
          const contract = await ContractTerm.findOrFail(query.contract)
          csQuery = csQuery.where('contract_term_id', contract.id)
        }
        if (query.experience) {
          const experience = await Experience.findOrFail(query.experience)
          csQuery = csQuery.where('experience_id', experience.id)
        }
      }

      const crowdsource = await csQuery.paginate(page, 20)
      await CrowdsourceData.loadRelations(crowdsource)
      const crowdsourceJson = crowdsource.toJSON()

      if (
        this.hasKeysFromArray(query, [
          'sector',
          'industry',
          'education',
          'job_family',
          'contract',
          'experience',
          'age_group',
          'city',
        ]) &&
        user.credits > 0
      )
        userCredits = await User.updateCredits(user, 1)
      else userCredits = await User.updateCredits(user)
      Object.assign(crowdsourceJson.meta, userCredits)

      return response.json(crowdsourceJson)
    } catch (error) {
      console.log(error)
      return response.unauthorized({
        errors: [{ message: 'You are not allowed to perform this action' }],
      })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    let message
    const user = auth.user!
    const payload = await request.validateUsing(storeValidator)
    const hasCrowdsource = await CrowdsourceData.findBy('created_by', user.id)
    const crowdDataPayload = { ...payload, created_by: user.id }

    if (!hasCrowdsource) {
      await User.updateCredits(user, 20, false)
      message = `Thank your for your submission ${user.firstname}. Market data insights have been unlocked.`
    } else {
      const now = new Date().getTime()
      const canNextUpdate = hasCrowdsource.canNextUpdate
      if (canNextUpdate > now)
        return response.badRequest({
          errors: [{ message: 'You are not allowed to perform this action' }],
        })
      message = `Your career profile has been successfully updated.`
    }

    const crowdsource = await CrowdsourceData.updateOrCreate(
      { createdBy: user.id },
      crowdDataPayload
    )

    await crowdsource.refresh()
    await User.loadRelations(user)
    await crowdsource.related('benefits').detach()

    if (payload.benefits.length > 0) {
      payload.benefits.forEach(async (benefit) => {
        await crowdsource.related('benefits').attach({
          [benefit.id]: { amount: benefit.amount ? benefit.amount : null },
        })
      })
    }

    response.json({ data: user, message: message })
  }

  async storeTargets({ auth, request, response }: HttpContext) {
    const user = auth.user!

    try {
      const crowdsource = await CrowdsourceData.findByOrFail('created_by', user.id)
      const targets = await CrowdsourceTargets.findBy('crowdsource_datum_id', user.id)
      const payload = await request.validateUsing(targetsValidator)

      const crowdDataPayload = {
        options: [
          { value: payload.salary, field: 'salary' },
          { value: payload.considerations, field: 'considerations' },
          { value: payload.retention_strategy, field: 'retention_strategy' },
          { value: payload.sector_id, field: 'sector_id', rlshp: 'sectors' },
          { value: payload.period_id, field: 'period_id', rlshp: 'experiences' },
          { value: payload.targeted_pay_id, field: 'targeted_pay_id', rlshp: 'currencies' },
        ],
        crowdsource_datum_id: crowdsource.id,
      }

      await CrowdsourceTargets.updateOrCreate(
        { crowdsourceDatumId: crowdsource.id },
        crowdDataPayload
      )

      if (!targets) {
        const userCredits = await User.updateCredits(user, 10, false)
        response.json({
          ...userCredits,
          message: `Thank you for submitting your targets ${auth.user!.firstname}. Your credits have been updated.`,
        })
      } else
        response.json({
          message: `Your targets have been updated successfully ${auth.user!.firstname}.`,
        })
    } catch (error) {
      return response.badRequest({
        errors: [
          { message: 'Missing crowdsource data. You are not allowed to perform this action' },
        ],
      })
    }
  }

  async show({ auth, response }: HttpContext) {
    try {
      const data = await CrowdsourceData.findByOrFail('created_by', auth.user!.id)
      await CrowdsourceData.loadRelations(data)
      return response.json(data)
    } catch (error) {
      return response.notFound({
        errors: [{ message: 'No associated career profile found.' }],
      })
    }
  }

  async showTargets({ auth, response }: HttpContext) {
    try {
      const data = await CrowdsourceData.findByOrFail('created_by', auth.user!.id)
      const targetData = await CrowdsourceTargets.findByOrFail('crowdsource_datum_id', data.id)
      await CrowdsourceData.loadRelations(data)

      let targets = {}
      const options = targetData.options as Array<any>
      options.forEach((option: any) => Object.assign(targets, { [option.field]: option.value }))
      Object.assign(targets, { country: data.toJSON().country })

      return response.json(targets)
    } catch (error) {
      return response.notFound({
        errors: [{ message: 'No associated career targets found.' }],
      })
    }
  }

  async totals({ auth, response }: HttpContext) {
    let datasets
    const myData = await CrowdsourceData.findBy('created_by', auth.user!.id)

    if (myData) {
      const records = await CrowdsourceData.query()
        .where('country_id', myData.countryId)
        .count('* as total')
      const totalRecords = records[0].$extras.total

      const cities = await CrowdsourceData.query()
        .where('country_id', myData.countryId)
        .groupBy('city_id')
        .count('* as total')

      const avg = await CrowdsourceData.query()
        .where('country_id', myData.countryId)
        .andWhere('job_family_id', myData.jobFamilyId)
        .avg('salary as total')
      await myData.load('jobFamily', (query) => query.select('label'))
      const average = Math.round(avg[0].$extras.total)
      const avgObj = {
        salary: CrowdsourceData.setDenomination(average),
        jobFamily: myData.jobFamily.label,
      }

      const sexes = await CrowdsourceData.query()
        .where('country_id', myData.countryId)
        .select(
          db.raw(`
          SUM(CASE WHEN gender_id = 1 THEN 1 ELSE 0 END) as male,
          SUM(CASE WHEN gender_id = 2 THEN 1 ELSE 0 END) as female,
          SUM(CASE WHEN gender_id = 3 THEN 1 ELSE 0 END) as nonBinary,
          COUNT(*) as total_count
        `)
        )
      const { male, female, nonBinary } = sexes[0].$extras
      const sexPercentages = {
        male: `${Math.round((male / totalRecords) * 99)}%`,
        female: `${Math.round((female / totalRecords) * 99)}%`,
        nonBinary: `${Math.round((nonBinary / totalRecords) * 99)}%`,
      }

      datasets = {
        records: totalRecords,
        cities: cities.length,
        avgSalary: avgObj,
        gender: sexPercentages,
      }
    } else {
      const records = await CrowdsourceData.query().count('* as total')
      datasets = { records: records[0].$extras.total }
    }

    return response.json(datasets)
  }

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}

  hasKeysFromArray(obj: object, keys: Array<string>) {
    return keys.some((key) => obj.hasOwnProperty(key))
  }
}
