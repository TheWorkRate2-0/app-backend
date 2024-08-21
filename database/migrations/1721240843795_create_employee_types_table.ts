import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employee_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: 'Local Staff (Nationally Recruited)' },
          { label: 'Expatriate (Internationally Recruited)' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
