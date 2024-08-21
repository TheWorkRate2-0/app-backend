import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff_counts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: '0 - 10' },
          { label: '11 - 20' },
          { label: '21 - 30' },
          { label: '31 - 50' },
          { label: '51 - 100' },
          { label: '101 - 150' },
          { label: '151 - 250' },
          { label: '251 - 500' },
          { label: 'over 500 Staff' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
