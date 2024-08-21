import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crowdsource_data'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('country_id').unsigned().references('id').inTable('countries').notNullable()
      table
        .integer('contract_term_id')
        .unsigned()
        .references('id')
        .inTable('contract_terms')
        .notNullable()
      table
        .integer('employee_type_id')
        .unsigned()
        .references('id')
        .inTable('employee_types')
        .notNullable()
      table.integer('city_id').unsigned().references('id').inTable('cities').notNullable()
      table.integer('age_id').unsigned().references('id').inTable('age_groups').notNullable()
      table.integer('sector_id').unsigned().references('id').inTable('sectors').notNullable()
      table.string('company').notNullable()
      table.string('position').nullable()
      table
        .integer('company_type_id')
        .unsigned()
        .references('id')
        .inTable('company_types')
        .notNullable()
      table.integer('salary').notNullable()
      table.integer('staff_count_id').unsigned().references('id').inTable('staff_counts').nullable()
      table
        .integer('job_family_id')
        .unsigned()
        .references('id')
        .inTable('job_families')
        .notNullable()
      table.integer('education_id').unsigned().references('id').inTable('educations').notNullable()
      table
        .integer('pay_currency_id')
        .unsigned()
        .references('id')
        .inTable('currencies')
        .notNullable()
      table
        .integer('experience_id')
        .unsigned()
        .references('id')
        .inTable('experiences')
        .notNullable()
      table.integer('gender_id').unsigned().references('id').inTable('genders').nullable()
      table.string('created_by').references('id').inTable('users').onDelete('SET NULL').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd',
          country_id: 25,
          city_id: 750,
          age_id: 6,
          gender_id: 1,
          education_id: 8,
          experience_id: 9,
          job_family_id: 150,
          company: 'Mabati Rolling Mills',
          position: 'National Sales Manager Distribution',
          salary: 556214,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: 'ed212ff9-dec3-44c1-a209-75d661d06f13',
          country_id: 25,
          city_id: 750,
          age_id: 3,
          gender_id: 2,
          education_id: 7,
          experience_id: 4,
          position: 'Retail Centre Representative',
          job_family_id: 150,
          company: 'Pwani Oil Products',
          salary: 70439,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '0b8db115-63f0-48be-acca-65fa3be82f58',
          country_id: 25,
          city_id: 725,
          age_id: 5,
          gender_id: 2,
          education_id: 8,
          experience_id: 8,
          position: 'Human Resource Manager',
          job_family_id: 90,
          company: 'United Millers',
          salary: 310000,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '2c904762-87a2-4b28-8e5c-23e8a581d17a',
          country_id: 25,
          city_id: 750,
          age_id: 4,
          gender_id: 1,
          education_id: 7,
          experience_id: 8,
          position: 'Logistics Manager',
          job_family_id: 177,
          company: 'Nestle Kenya',
          salary: 190500,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '39b5792f-d832-47ce-9eb0-6af18fd35989',
          country_id: 25,
          city_id: 750,
          age_id: 3,
          gender_id: 2,
          education_id: 7,
          experience_id: 5,
          position: 'Human Resource Officer',
          job_family_id: 90,
          company: 'Savanna Cement',
          salary: 120000,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888',
          country_id: 25,
          city_id: 750,
          age_id: 5,
          gender_id: 3,
          education_id: 8,
          experience_id: 8,
          position: 'Management and Reporting Accountant',
          job_family_id: 68,
          company: 'Unga Limited PLC',
          salary: 317569,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e',
          country_id: 25,
          city_id: 750,
          age_id: 7,
          gender_id: 2,
          education_id: 10,
          experience_id: 9,
          position: 'Health Safety & Environment Consultant',
          job_family_id: 55,
          company: 'Living Goods',
          salary: 586011,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '90d196ff-b7b9-475d-aa5c-5911e16a812e',
          country_id: 25,
          city_id: 750,
          age_id: 6,
          gender_id: 1,
          education_id: 10,
          experience_id: 8,
          position: 'Country Programme Coordinator for Agribusiness',
          job_family_id: 132,
          company: 'Self Help Africa',
          salary: 395000,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: '94899698-de32-497a-9818-1e3ac34edfeb',
          country_id: 25,
          city_id: 750,
          age_id: 5,
          gender_id: 1,
          education_id: 7,
          experience_id: 8,
          position: 'Senior Policy and Political Advisor',
          job_family_id: 127,
          company: 'Greenpeace Africa',
          salary: 387252,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
        {
          id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a',
          country_id: 25,
          city_id: 750,
          age_id: 3,
          gender_id: 2,
          education_id: 7,
          experience_id: 5,
          position: 'Regional Communication Coordinator',
          job_family_id: 138,
          company: 'International Solidarity Foundation',
          salary: 134484,
          company_type_id: 2,
          pay_currency_id: 16,
          contract_term_id: 3,
          employee_type_id: 1,
          sector_id: 6,
          staff_count_id: 3,
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
