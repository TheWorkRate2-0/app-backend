import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sectors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .multiInsert([
          { label: 'Agriculture | Animal Production' },
          { label: 'Agriculture | Crop Production' },
          { label: 'Agriculture | Farm Management and Operations' },
          { label: 'Agriculture | Fisheries' },
          { label: 'Agriculture | Food Processing and Production' },
          { label: 'Agriculture | Forestry' },
          { label: 'Consumer Goods | Automotive' },
          { label: 'Consumer Goods | Consumer Products' },
          { label: 'Consumer Goods | Retail, Wholesale & Distribution' },
          { label: 'Education | Educational Publishers' },
          { label: 'Education | Private Colleges' },
          { label: 'Education | Private Schools - Early Childhood' },
          { label: 'Education | Private Schools - Elementaty/Primary' },
          { label: 'Education | Private Schools - Secondary/High School' },
          { label: 'Education | Private Technical/Tertiary Institutions' },
          { label: 'Education | Private Universities' },
          { label: 'Energy | Electricity' },
          { label: 'Energy | Oil and Gas' },
          { label: 'Financial Services | Banking & Capital Markets' },
          { label: 'Financial Services | Financial Technology Services (FinTech)' },
          { label: 'Financial Services | Insurance' },
          { label: 'Financial Services | Investment Management' },
          { label: 'Financial Services | Real Estate' },
          { label: 'Industrial Products & Construction | Construction' },
          { label: 'Industrial Products & Construction | Manufacturing' },
          { label: 'Industrial Products & Construction | Mining & Metals' },
          { label: 'Industrial Products & Construction | Safety Health and Environmental' },
          { label: 'Life Sciences & Health Care | Health Care' },
          { label: 'Life Sciences & Health Care | Life Sciences' },
          { label: 'Media & Publishing | Creative & Agencies' },
          { label: 'Media & Publishing | Media & Entertainment' },
          { label: 'Private Sector Organisation | Membership Associations' },
          { label: 'Private Security | Private Security' },
          { label: 'Professional Services | Consulting' },
          { label: 'Professional Services | Research' },
          { label: 'Public Sector | Central Government & Public Service' },
          { label: 'Public Sector | Regional / County Government' },
          { label: 'Social Impact Sector | Foundations' },
          { label: 'Social Impact Sector | Not for Profit' },
          { label: 'Social Impact Sector | Social Enterprises' },
          { label: 'Technology & Telecommunications | Technology' },
          { label: 'Technology & Telecommunications | Telecommunications' },
          { label: 'Tourism and Hospitality | Entertainment and Recreation' },
          { label: 'Tourism and Hospitality | Food and Beverage' },
          { label: 'Tourism and Hospitality | Lodging and Accomodation' },
          { label: 'Tourism and Hospitality | Meetings and Events' },
          { label: 'Tourism and Hospitality | Travel and Tourism' },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
