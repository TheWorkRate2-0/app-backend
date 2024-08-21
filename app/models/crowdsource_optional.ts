import CrowdsourceDatum from '#models/crowdsource_datum'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'

export default class CrowdsourceOptional extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: null })
  declare genderId: number

  @column({ serializeAs: null })
  declare crowdsourceDatumId: number

  @column()
  declare options: string | Array<object>

  @beforeCreate()
  static async stringifyOptions(optional: CrowdsourceOptional) {
    optional.options = JSON.stringify(optional.options)
  }

  @belongsTo(() => CrowdsourceDatum)
  declare crowdsourceData: BelongsTo<typeof CrowdsourceDatum>
}
