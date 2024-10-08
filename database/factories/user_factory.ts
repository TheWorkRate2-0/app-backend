import User from '#models/user'
import City from '#models/city'
import Benefit from '#models/benefit'
import CrowdsourceDatum from '#models/crowdsource_datum'
import factory from '@adonisjs/lucid/factories'

export const BenefitsFactory = factory
  .define(Benefit, async () => {
    const benefit = await Benefit.find(Math.floor(Math.random() * 29) + 1)
    return benefit!
  })
  .build()

export const CrowdsourceFactory = factory
  .define(CrowdsourceDatum, async ({ faker }) => {
    const countryId = 25
    // Math.floor(Math.random() * 54) + 1
    const cities = await City.query().where('country_id', countryId).orderBy('id', 'desc')
    let firstCityId = cities.pop()!.id
    let lastCityId = cities[0].id

    return {
      countryId: countryId,
      contractTermId: Math.floor(Math.random() * 6) + 1,
      employeeTypeId: Math.floor(Math.random() * 2) + 1,
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      ageId: Math.floor(Math.random() * 10) + 1,
      sectorId: Math.floor(Math.random() * 47) + 1,
      companyTypeId: Math.floor(Math.random() * 4) + 1,
      salary: Number(faker.finance.amount({ min: 15000, max: 500000, dec: 0 })),
      experienceId: Math.floor(Math.random() * 10) + 1,
      staffCountId: Math.floor(Math.random() * 9) + 1,
      jobFamilyId: Math.floor(Math.random() * 190) + 1,
      educationId: Math.floor(Math.random() * 11) + 1,
      payCurrencyId: Math.floor(Math.random() * 54) + 1,
      genderId: Math.floor(Math.random() * 3) + 1,
      cityId: Math.random() * (lastCityId - firstCityId) + firstCityId,
    }
  })
  .relation('benefits', () => BenefitsFactory)
  .build()

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      roleId: 1,
      statusId: 2,
      emailVerified: true,
      authType: 'app',
    }
  })
  .relation('crowdsource', () => CrowdsourceFactory)
  .build()
