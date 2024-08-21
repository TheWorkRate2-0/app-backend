import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'company_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: 'Public Sector' },
          { label: 'For Profit (Revenue Generating)' },
          { label: 'Not-For-Profit' },
          { label: 'Start Up' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
