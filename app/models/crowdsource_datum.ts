import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import User from '#models/user'
import City from '#models/city'
import Gender from '#models/gender'
import Sector from '#models/sector'
import Country from '#models/country'
import Benefit from '#models/benefit'
import Currency from '#models/currency'
import AgeGroup from '#models/age_group'
import Education from '#models/education'
import JobFamily from '#models/job_family'
import Experience from '#models/experience'
import StaffCount from '#models/staff_count'
import db from '@adonisjs/lucid/services/db'
import CompanyType from '#models/company_type'
import ContractTerm from '#models/contract_term'
import EmployeeType from '#models/employee_type'
import CrowdsourceTargets from '#models/crowdsource_target'

import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import {
  BaseModel,
  column,
  beforeCreate,
  beforeSave,
  belongsTo,
  manyToMany,
} from '@adonisjs/lucid/orm'

export default class CrowdsourceDatum extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ serializeAs: null })
  declare ageId: number

  @column({ serializeAs: null })
  declare cityId: number

  @column({ serializeAs: null })
  declare contractTermId: number

  @column({ serializeAs: null })
  declare countryId: number

  @column({ serializeAs: null })
  declare payCurrencyId: number

  @column({ serializeAs: null })
  declare educationId: number

  @column({ serializeAs: null })
  declare employeeTypeId: number

  @column({ serializeAs: null })
  declare experienceId: number

  @column({ serializeAs: null })
  declare genderId: number

  @column({ serializeAs: null })
  declare jobFamilyId: number

  @column()
  declare company: string

  @column({ serializeAs: null })
  declare companyTypeId: number

  @column()
  declare position: string

  @column()
  declare salary: number

  @column({ serializeAs: null })
  declare sectorId: number

  @column({ serializeAs: null })
  declare staffCountId: number

  @column({ serializeAs: null })
  declare createdBy: string

  @column()
  declare totalCompensation: number

  @column()
  declare targets: Array<any>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value
        ? new Date(value?.setZone('utc').toISO() as string).toLocaleDateString([], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })
        : value
    },
  })
  declare createdAt: DateTime

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare canNextUpdate: number

  @beforeCreate()
  static async generateId(data: CrowdsourceDatum) {
    data.id = uuidv4()
  }

  @beforeSave()
  static async setCanNextUpdateDate(data: CrowdsourceDatum) {
    const unixTimestamp = new Date().setMonth(new Date().getMonth() + 1)
    data.canNextUpdate = unixTimestamp
  }

  @belongsTo(() => AgeGroup, { localKey: 'id', foreignKey: 'ageId' })
  declare age: BelongsTo<typeof AgeGroup>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @belongsTo(() => ContractTerm)
  declare contactTerm: BelongsTo<typeof ContractTerm>

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Currency, { localKey: 'id', foreignKey: 'payCurrencyId' })
  declare payCurrency: BelongsTo<typeof Currency>

  @belongsTo(() => Education)
  declare education: BelongsTo<typeof Education>

  @belongsTo(() => EmployeeType)
  declare employeeType: BelongsTo<typeof EmployeeType>

  @belongsTo(() => Experience)
  declare experience: BelongsTo<typeof Experience>

  @belongsTo(() => Gender)
  declare gender: BelongsTo<typeof Gender>

  @belongsTo(() => JobFamily)
  declare jobFamily: BelongsTo<typeof JobFamily>

  @belongsTo(() => CompanyType)
  declare companyType: BelongsTo<typeof CompanyType>

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>

  @belongsTo(() => StaffCount)
  declare staffCount: BelongsTo<typeof StaffCount>

  @belongsTo(() => User, { localKey: 'createdBy', foreignKey: 'id' })
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Benefit, { pivotColumns: ['amount'] })
  declare benefits: ManyToMany<typeof Benefit>

  static async loadRelations(models: CrowdsourceDatum | CrowdsourceDatum[]) {
    if (Array.isArray(models)) {
      await Promise.all(models.map((model) => this.loadRelations(model)))
      return
    }

    await models.load('age')
    await models.load('city')
    await models.load('gender')
    await models.load('sector')
    await models.load('jobFamily')
    await models.load('education')
    await models.load('experience')
    await models.load('staffCount')
    await models.load('companyType')
    await models.load('contactTerm')
    await models.load('payCurrency')
    await models.load('employeeType')
    await models.load('benefits', (query) => query.pivotColumns(['amount']))
    await models.load('country', (query) => query.preload('currency'))
    await this.loadTargets(models)

    let totalCompensation = models.salary
    models.benefits.forEach((benefit) => {
      if (benefit.$extras.pivot_amount) {
        Object.assign(benefit, { amount: benefit.$extras.pivot_amount })
        totalCompensation += benefit.$extras.pivot_amount
      }
    })

    models.totalCompensation = totalCompensation
  }

  static async loadTargets(model: CrowdsourceDatum) {
    let optionCurrency: string
    const targets = await CrowdsourceTargets.findBy('crowdsource_datum_id', model.id)
    if (targets) {
      const options = await Promise.all(
        (targets.options as object[]).map(async (option: any) => {
          if (option.hasOwnProperty('rlshp')) {
            const query = db.from(option.rlshp).where('id', option.value)
            if (option.rlshp === 'currencies') query.select('id', 'label', 'abbr')
            else query.select('id', 'label')
            const rlshp = await query.first()

            if (option.rlshp === 'currencies') optionCurrency = rlshp.abbr
            Object.assign(option, { relation: rlshp })
            delete option.rlshp
          }
          return option
        })
      )

      options.map((option: any) =>
        option.field === 'salary'
          ? Object.assign(option, { value: `${optionCurrency} ${option.value}` })
          : option
      )
      Object.assign(model, { targets: options })
    }
  }

  static setDenomination(number: number) {
    const chars = `${number}`.length
    if (chars > 3 && chars < 7) return this.checkModulus(number, 1000)
    if (chars >= 7) return this.checkModulus(number, 1000000)
    return number
  }

  static checkModulus(number: number, weight: number) {
    return number % weight === 0
      ? `${number / weight}K`
      : `${Math.round(number / weight).toFixed(2)}K`
  }

  // static async extendedMeta() {
  //   const users = await User.query().where('role_id', Roles.user).count('* as total')
  //   const orgs = await User.query().where('role_id', Roles.organisation).count('* as total')
  //   const moderators = await User.query().where('role_id', Roles.moderator).count('* as total')

  //   return {
  //     users: users[0].$extras.total,
  //     organizations: orgs[0].$extras.total,
  //     moderators: moderators[0].$extras.total,
  //   }
  // }
}
