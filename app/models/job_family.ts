import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class JobFamily extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string
}
