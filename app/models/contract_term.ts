import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ContractTerm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string
}
