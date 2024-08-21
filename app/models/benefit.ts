import CrowdsourceDatum from '#models/crowdsource_datum'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'

export default class Benefit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare label: string

  @column()
  declare amount: number | null

  @column({
    serialize: (value: Boolean) => {
      return Boolean(value)
    },
  })
  declare allowance: boolean

  @manyToMany(() => CrowdsourceDatum, { pivotColumns: ['amount'] })
  declare crowdsource: ManyToMany<typeof CrowdsourceDatum>
}
