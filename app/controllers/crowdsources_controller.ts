import type { HttpContext } from '@adonisjs/core/http'
import CrowdsourceData from '#models/crowdsource_datum'
import CrowdsourceOptional from '#models/crowdsource_optional'
import { storeValidator, targetsValidator } from '#validators/crowdsource'

export default class CrowdsourcesController {
  async index({ auth, request, response }: HttpContext) {
    try {
      const data = await CrowdsourceData.findByOrFail('created_by', auth.user!.id)
      const query = request.only(['page', 'limit'])
      const page = query.page ?? 1
      const limit = query.limit ?? 20
      let csQuery = CrowdsourceData.query()

      const crowdsource = await csQuery.paginate(page, limit)
      await CrowdsourceData.loadRelations(crowdsource)

      return response.json(crowdsource)
    } catch (error) {
      console.log(error)
      return response.unauthorized({
        errors: [{ message: 'You are not allowed to perform this action' }],
      })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const crowdDataPayload = { ...payload, created_by: auth.user!.id }
    const crowdsource = await CrowdsourceData.create(crowdDataPayload)

    if (payload.benefits.length > 0) {
      payload.benefits.forEach(async (benefit) => {
        await crowdsource.related('benefits').attach({
          [benefit.id]: { amount: benefit.amount ? benefit.amount : null },
        })
      })
    }

    response.json({
      message: `Thank your for your submission ${auth.user!.firstname}. Market data insights have been unlocked.`,
    })
  }

  async totalRecords({ response }: HttpContext) {
    const totalRecords = await CrowdsourceData.query().count('* as total')
    return response.json({ total: totalRecords[0].$extras.total })
  }

  async show({ auth, response }: HttpContext) {
    const data = await CrowdsourceData.findBy('created_by', auth.user!.id)
    if (data) await CrowdsourceData.loadRelations(data)
    return response.json(data)
  }

  async storeOptional({ auth, request, response }: HttpContext) {
    const data = await CrowdsourceData.findBy('created_by', auth.user!.id)
    if (!data) return response.badRequest({ errors: [{ message: 'Bad request initiated' }] })

    const optional = await CrowdsourceOptional.findBy('crowdsource_datum_id', data.id)
    if (optional) return response.badRequest({ errors: [{ message: 'Bad request initiated' }] })

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
      crowdsource_datum_id: data?.id,
    }

    await CrowdsourceOptional.create(crowdDataPayload)
    response.json({
      message: `Thank you for your submission ${auth.user!.firstname}. Your data is being analyzed against our market data.`,
    })
  }

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
