import type { HttpContext } from '@adonisjs/core/http'
import EmployeeType from '#models/employee_type'
import ContractTerm from '#models/contract_term'
import StaffCount from '#models/staff_count'
import Experience from '#models/experience'
import JobFamily from '#models/job_family'
import Education from '#models/education'
import AgeGroup from '#models/age_group'
import Currency from '#models/currency'
import CompanyType from '#models/company_type'
import Country from '#models/country'
import Benefit from '#models/benefit'
import Gender from '#models/gender'
import Sector from '#models/sector'
import City from '#models/city'
import { cityValidator, searchValidator, currencyValidator } from '#validators/app'

export default class AppController {
  async countries({ request, response }: HttpContext) {
    const payload = await request.validateUsing(searchValidator)
    const countries =
      payload.search.length > 0
        ? await Country.query()
            .whereILike('label', '%' + payload.search + '%')
            .preload('currency')
            .orderBy('id', 'asc')
        : []

    return response.json(countries)
  }

  async cities({ request, response }: HttpContext) {
    const payload = await request.validateUsing(cityValidator)
    const cities = await City.query().where('country_id', payload.country).orderBy('id', 'asc')
    return response.json(cities)
  }

  async ages({ response }: HttpContext) {
    const ages = await AgeGroup.query().orderBy('id', 'asc')
    return response.json(ages)
  }

  async genderRoles({ response }: HttpContext) {
    const roles = await Gender.query().orderBy('id', 'asc')
    return response.json(roles)
  }

  async experience({ response }: HttpContext) {
    const years = await Experience.query().orderBy('id', 'asc')
    return response.json(years)
  }

  async education({ response }: HttpContext) {
    const education = await Education.query().orderBy('id', 'asc')
    return response.json(education)
  }

  async jobFamilies({ request, response }: HttpContext) {
    const payload = await request.validateUsing(searchValidator)
    const families =
      payload.search.length > 0
        ? await JobFamily.query()
            .whereILike('label', '%' + payload.search + '%')
            .orderBy('id', 'asc')
        : []
    return response.json(families)
  }

  async companyTypes({ response }: HttpContext) {
    const types = await CompanyType.query().orderBy('id', 'asc')
    return response.json(types)
  }

  async sectors({ response }: HttpContext) {
    const sectors = await Sector.query().orderBy('id', 'asc')
    return response.json(sectors)
  }

  async employment({ response }: HttpContext) {
    const types = await EmployeeType.query().orderBy('id', 'asc')
    return response.json(types)
  }

  async contractTerms({ response }: HttpContext) {
    const terms = await ContractTerm.query().orderBy('id', 'asc')
    return response.json(terms)
  }

  async staffCount({ response }: HttpContext) {
    const ranges = await StaffCount.query().orderBy('id', 'asc')
    return response.json(ranges)
  }

  async benefits({ response }: HttpContext) {
    const benefits = await Benefit.query().orderBy('id', 'asc')
    return response.json(benefits)
  }

  async currencies({ request, response }: HttpContext) {
    const payload = await request.validateUsing(currencyValidator)
    let currencies
    if (payload.pay_id) {
      currencies = await Currency.query()
        .orderByRaw(`CASE WHEN id = ? THEN 0 ELSE 1 END`, [payload.pay_id])
        .orderBy('id', 'asc')
      Object.assign(currencies[0], { label: 'No other currency' })
    } else if (payload.currency) {
      currencies = await Currency.query().where('id', payload.currency)
    } else currencies = await Currency.query().orderBy('id', 'asc')

    return response.json(currencies)
  }
}
