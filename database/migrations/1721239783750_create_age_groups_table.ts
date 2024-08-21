import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'age_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: '18 - 20' },
          { label: '21 - 24' },
          { label: '25 - 30' },
          { label: '31 - 35' },
          { label: '36 - 40' },
          { label: '41 - 45' },
          { label: '46 - 50' },
          { label: '51 - 55' },
          { label: '55 - 60' },
          { label: '61 and Above' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
