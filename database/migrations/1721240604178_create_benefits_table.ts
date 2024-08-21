import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'benefits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
      table.boolean('allowance').nullable().defaultTo(false)
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: '13th Month Salary' },
          { label: 'Annual Bonus' },
          { label: 'Performance Bonus' },
          { label: 'Holiday Bonus' },
          { label: 'Childcare Assistance' },
          { label: 'Company Housing' },
          { label: 'Disability Insurance' },
          { label: 'Education Assistance for Children' },
          { label: 'Education Assistance for Self' },
          { label: 'Employee Assistance Programs (EAP)' },
          { label: 'Employee Discounts' },
          { label: 'Flexible Work Arrangements' },
          { label: 'Health Insurance' },
          { label: 'House Allowance', allowance: true },
          { label: 'Legal Assistance' },
          { label: 'Life Insurance' },
          { label: 'Paid Time Off (PTO)' },
          { label: 'Maternity Leave' },
          { label: 'Parental Leave' },
          { label: 'Professional Memberships' },
          { label: 'Recognition Programs' },
          { label: 'Relocation Assistance' },
          { label: 'Retirement Plans / Pension Benefit' },
          { label: 'Stock Options or Equity Grants' },
          { label: 'Subsidized Lunch' },
          { label: 'Tax support' },
          { label: 'Transportation Benefits', allowance: true },
          { label: 'Tuition Reimbursement' },
          { label: 'Wellness Programs' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
