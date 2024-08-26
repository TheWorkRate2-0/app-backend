import env from '#start/env'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  column,
  computed,
  hasMany,
  hasOne,
  belongsTo,
  afterCreate,
  beforeCreate,
} from '@adonisjs/lucid/orm'
import type { HasMany, HasOne, BelongsTo } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

import Role from '#models/role'
import Roles from '#enums/roles'
import Token from '#models/token'
import Status from '#models/status'
import Statuses from '#enums/statuses'
import CrowdsourceDatum from '#models/crowdsource_datum'
import CrowdsourceTargets from '#models/crowdsource_target'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column({ serializeAs: null })
  declare roleId: number

  @column({ serializeAs: null })
  declare statusId: number

  @column()
  declare emailVerified: boolean

  @column({ serializeAs: null })
  declare rememberMeToken: string | null

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare publicPic: string

  @column({ serializeAs: null })
  declare authType: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare credits: number

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
  declare updatedAt: DateTime | null

  @computed()
  get firstname() {
    const name = this.name.split(' ')
    return name[0]
  }

  @computed({ serializeAs: null })
  get newlyCreated() {
    const currentDate = new Date()
    const createdAt = new Date(this.createdAt as any)
    const difference = currentDate.getTime() - createdAt.getTime()
    let daysApart = Math.round(difference / (1000 * 3600 * 24))
    if (daysApart < 7) return true
    else return false
  }

  @computed({ serializeAs: null })
  get isAdmin() {
    return this.roleId === Roles.admin
  }

  @column()
  declare allowed_states: Status[]

  @column()
  declare hasProfile: boolean

  @column()
  declare hasTargets: boolean

  @beforeCreate()
  static async generateId(user: User) {
    user.id = uuidv4()
  }

  @afterCreate()
  static async setCredits(user: User) {
    const refreshed = await user.refresh()
    if (refreshed.roleId === Roles.user) await user.merge({ credits: 0 }).save()
  }

  @afterCreate()
  static async sendWelcomeEmail(user: User) {
    const hasPassword = await user.hasPassword()
    if (hasPassword) {
      const token = await Token.generateVerifyEmailToken(user)
      const url = `${env.get('APP_FRONT_URL')}?verify-email=${token}`

      await mail.sendLater((message) => {
        message
          .to(user.email)
          .subject('Verify your email address')
          .htmlView('emails/verify-email', { url: url, name: user.name })
      })
    }
  }

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @hasOne(() => CrowdsourceDatum, { localKey: 'id', foreignKey: 'createdBy' })
  declare crowdsource: HasOne<typeof CrowdsourceDatum>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'PASSWORD_RESET'),
  })
  declare passwordResetTokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'VERIFY_EMAIL'),
  })
  declare verifyEmailTokens: HasMany<typeof Token>

  async hasPassword() {
    if (this.password !== null && this.password !== undefined) return true
    return false
  }

  async allowedStatuses() {
    const query = Status.query()

    switch (this.statusId) {
      case Statuses.deleted:
        await query.where('id', Statuses.suspended)
        if (Boolean(this.emailVerified) === true) await query.orWhere('id', Statuses.active)
        break
      case Statuses.suspended:
        await query.where('id', Statuses.deleted)
        if (Boolean(this.emailVerified) === true) await query.orWhere('id', Statuses.active)
        break
      default:
        await query.where('id', Statuses.deleted).orWhere('id', Statuses.suspended)
        break
    }
    return query
  }

  static async extendedMeta() {
    const users = await User.query().where('role_id', Roles.user).count('* as total')
    const orgs = await User.query().where('role_id', Roles.organisation).count('* as total')
    const moderators = await User.query().where('role_id', Roles.moderator).count('* as total')

    return {
      users: users[0].$extras.total,
      organizations: orgs[0].$extras.total,
      moderators: moderators[0].$extras.total,
    }
  }

  static async userStatuses(models: User | User[]) {
    if (Array.isArray(models)) {
      await Promise.all(models.map((model) => this.userStatuses(model)))
      return
    }
    const statuses = await models.allowedStatuses()
    Object.assign(models, { allowed_states: statuses })
  }

  static async checkCrowdsource(model: User) {
    const crowdsource = await CrowdsourceDatum.findBy('created_by', model.id)
    Object.assign(model, { hasProfile: crowdsource ? true : false })

    if (crowdsource) {
      await model.load('crowdsource', (query) =>
        query.preload('country', (cQuery: any) => cQuery.preload('currency'))
      )

      const targets = await CrowdsourceTargets.findBy('crowdsource_datum_id', crowdsource.id)
      Object.assign(model, { hasTargets: targets ? true : false })
    } else Object.assign(model, { hasTargets: false })
  }

  static async loadRelations(models: User | User[]) {
    if (Array.isArray(models)) {
      await Promise.all(models.map((model) => this.loadRelations(model)))
      return
    }

    await models.load('role')
    await models.load('status')
    await User.checkCrowdsource(models)
  }

  static async updateCredits(user: User, credit?: number | null, deduct: boolean = true) {
    if (credit) {
      if (!deduct) await user.merge({ credits: user.credits + credit }).save()
      else {
        if (user.credits > 0) await user.merge({ credits: user.credits - credit }).save()
      }
    }

    await user.refresh()
    return { credits: user.credits }
  }

  async sendGoogleRegEmail() {
    const url = `${env.get('APP_FRONT_URL')}/dashboard`
    await mail.sendLater((message) => {
      message
        .to(this.email)
        .subject('Welcome to TheWorkrate')
        .htmlView('emails/google-welcome', { url: url, name: this.name })
    })
  }
}
