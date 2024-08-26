import CrowdsourceDatum from '#models/crowdsource_datum'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'

export default class CrowdsourceTargets extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: null })
  declare crowdsourceDatumId: string

  @column()
  declare options: string | Array<object>

  @beforeSave()
  static async stringifyOptions(targets: CrowdsourceTargets) {
    targets.options = JSON.stringify(targets.options)
  }

  @belongsTo(() => CrowdsourceDatum)
  declare crowdsourceData: BelongsTo<typeof CrowdsourceDatum>
}
