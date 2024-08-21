import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'experiences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: '0 Years / Entry level' },
          { label: 'Up to 6 Months' },
          { label: '6 Months - 1 year' },
          { label: '1 - 3 Years' },
          { label: '4 - 6 Years' },
          { label: '7 - 9 Years' },
          { label: '10 - 12 Years' },
          { label: '13 - 15 Years' },
          { label: '16 - 20 Years' },
          { label: '21 years and above' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
