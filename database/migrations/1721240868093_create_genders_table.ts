import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'genders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([{ label: 'Male' }, { label: 'Female' }, { label: 'Non Binary' }])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
