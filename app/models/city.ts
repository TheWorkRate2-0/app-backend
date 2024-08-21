import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string
}
