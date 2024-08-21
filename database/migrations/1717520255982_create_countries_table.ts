import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
      table.string('code').notNullable()
      table.string('iso').notNullable()
      table.integer('currency_id').unsigned().references('id').inTable('currencies').notNullable()

      table.unique(['iso'])
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { currency_id: 1, label: 'Algeria', code: '213', iso: 'DZ' },
        { currency_id: 2, label: 'Angola', code: '244', iso: 'AO' },
        { currency_id: 49, label: 'Benin', code: '229', iso: 'BJ' },
        { currency_id: 4, label: 'Botswana', code: '267', iso: 'BW' },
        { currency_id: 49, label: 'Burkina Faso', code: '226', iso: 'BF' },
        { currency_id: 6, label: 'Burundi', code: '257', iso: 'BI' },
        { currency_id: 8, label: 'Cape Verde', code: '238', iso: 'CV' },
        { currency_id: 9, label: 'Cameroon', code: '237', iso: 'CM' },
        { currency_id: 9, label: 'Central African Republic', code: '236', iso: 'CF' },
        { currency_id: 9, label: 'Chad', code: '235', iso: 'TD' },
        { currency_id: 11, label: 'Comoros', code: '269', iso: 'KM' },
        { currency_id: 12, label: 'Democratic Republic of the Congo', code: '243', iso: 'CD' },
        { currency_id: 49, label: "Côte d'Ivoire", code: '225', iso: 'CI' },
        { currency_id: 13, label: 'Djibouti', code: '253', iso: 'DJ' },
        { currency_id: 14, label: 'Egypt', code: '20', iso: 'EG' },
        { currency_id: 9, label: 'Equatorial Guinea', code: '240', iso: 'GQ' },
        { currency_id: 15, label: 'Eritrea', code: '291', iso: 'ER' },
        { currency_id: 42, label: 'Eswatini', code: '268', iso: 'SZ' },
        { currency_id: 16, label: 'Ethiopia', code: '251', iso: 'ET' },
        { currency_id: 9, label: 'Gabon', code: '241', iso: 'GA' },
        { currency_id: 18, label: 'Gambia', code: '220', iso: 'GM' },
        { currency_id: 19, label: 'Ghana', code: '233', iso: 'GH' },
        { currency_id: 20, label: 'Guinea', code: '224', iso: 'GN' },
        { currency_id: 49, label: 'Guinea-Bissau', code: '245', iso: 'GW' },
        { currency_id: 23, label: 'Kenya', code: '254', iso: 'KE' },
        { currency_id: 24, label: 'Lesotho', code: '266', iso: 'LS' },
        { currency_id: 25, label: 'Liberia', code: '231', iso: 'LR' },
        { currency_id: 26, label: 'Libya', code: '218', iso: 'LY' },
        { currency_id: 27, label: 'Madagascar', code: '261', iso: 'MG' },
        { currency_id: 28, label: 'Malawi', code: '265', iso: 'MW' },
        { currency_id: 49, label: 'Mali', code: '223', iso: 'ML' },
        { currency_id: 29, label: 'Mauritania', code: '222', iso: 'MR' },
        { currency_id: 30, label: 'Mauritius', code: '230', iso: 'MU' },
        { currency_id: 31, label: 'Morocco', code: '212', iso: 'MA' },
        { currency_id: 32, label: 'Mozambique', code: '258', iso: 'MZ' },
        { currency_id: 33, label: 'Namibia', code: '264', iso: 'NA' },
        { currency_id: 49, label: 'Niger', code: '227', iso: 'NE' },
        { currency_id: 34, label: 'Nigeria', code: '234', iso: 'NG' },
        { currency_id: 35, label: 'Rwanda', code: '250', iso: 'RW' },
        { currency_id: 36, label: 'Sao Tome and Principe', code: '239', iso: 'ST' },
        { currency_id: 49, label: 'Senegal', code: '221', iso: 'SN' },
        { currency_id: 37, label: 'Seychelles', code: '248', iso: 'SC' },
        { currency_id: 38, label: 'Sierra Leone', code: '232', iso: 'SL' },
        { currency_id: 39, label: 'Somalia', code: '252', iso: 'SO' },
        { currency_id: 40, label: 'South Africa', code: '27', iso: 'ZA' },
        { currency_id: 41, label: 'South Sudan', code: '211', iso: 'SS' },
        { currency_id: 42, label: 'Sudan', code: '249', iso: 'SD' },
        { currency_id: 45, label: 'Tanzania', code: '255', iso: 'TZ' },
        { currency_id: 49, label: 'Togo', code: '228', iso: 'TG' },
        { currency_id: 46, label: 'Tunisia', code: '216', iso: 'TN' },
        { currency_id: 47, label: 'Uganda', code: '256', iso: 'UG' },
        { currency_id: 31, label: 'Western Sahara', code: '212', iso: 'EH' },
        { currency_id: 50, label: 'Zambia', code: '260', iso: 'ZM' },
        { currency_id: 51, label: 'Zimbabwe', code: '263', iso: 'ZW' },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
