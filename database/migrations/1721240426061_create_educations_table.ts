import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'educations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: 'Primary Certificate' },
          { label: 'Secondary Certificate' },
          { label: 'National Skills Certificate |Trade Test | Vocational Certificate' },
          { label: 'Artisan Certificate' },
          { label: 'Diploma' },
          { label: 'Professional Diploma/Full ACCA/CPA' },
          { label: "Bachelor's Degree (4 Years)" },
          { label: "Bachelor's Degree Plus Postgraduate Diploma" },
          { label: "Professional bachelor's degree (above 4 years)" },
          { label: "Master's Degree" },
          { label: 'Doctorate Degree' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
