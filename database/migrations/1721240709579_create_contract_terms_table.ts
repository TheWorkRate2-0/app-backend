import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contract_terms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: 'Internship' },
          { label: 'Fixed Term Contract - 1 year' },
          { label: 'Fixed Term Contract - up to 3 years' },
          { label: 'Indefinite Contract (Permanent)' },
          { label: 'Reliever' },
          { label: 'Consultant ' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
