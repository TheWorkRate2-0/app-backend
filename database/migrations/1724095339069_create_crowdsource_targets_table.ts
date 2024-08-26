import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crowdsource_targets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .string('crowdsource_datum_id')
        .references('id')
        .inTable('crowdsource_data')
        .onDelete('CASCADE')
        .notNullable()
      table.unique('crowdsource_datum_id')
      table.json('options').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
