import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CompanyType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string
}
