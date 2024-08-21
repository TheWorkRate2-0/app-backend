import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Currency from '#models/currency'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string

  @column({ serializeAs: null })
  declare iso: string

  @column({ serializeAs: null })
  declare code: string

  @column({ serializeAs: null })
  declare currencyId: number

  @belongsTo(() => Currency)
  declare currency: BelongsTo<typeof Currency>
}
