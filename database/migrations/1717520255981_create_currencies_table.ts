import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'currencies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
      table.string('abbr').notNullable()

      this.defer(async (db) => {
        await db.table(this.tableName).multiInsert([
          { abbr: 'DZD', label: 'Algerian Dinar (DZD)' },
          { abbr: 'AOA', label: 'Angolan Kwanza (AOA)' },
          { abbr: 'AUD', label: 'Australian Dollar (AUD)' },
          { abbr: 'BWP', label: 'Botswana Pula (BWP)' },
          { abbr: 'GBP', label: 'British Pound Sterling (GBP)' },
          { abbr: 'BIF', label: 'Burundian Franc (BIF)' },
          { abbr: 'CAD', label: 'Canadian Dollar (CAD)' },
          { abbr: 'CVE', label: 'Cape Verdean Escudo (CVE)' },
          { abbr: 'CFA', label: 'Central African franc (CFA)' },
          { abbr: 'CNY', label: 'Chinese Yuan (CNY)' },
          { abbr: 'KMF', label: 'Comorian Franc (KMF)' },
          { abbr: 'CDF', label: 'Congolese Franc (CDF)' },
          { abbr: 'DJF', label: 'Djiboutian franc (DJF)' },
          { abbr: 'EGP', label: 'Egyptian Pound (EGP)' },
          { abbr: 'ERN', label: 'Eritrean Nakfa (ERN)' },
          { abbr: 'ETB', label: 'Ethiopian Birr (ETB)' },
          { abbr: 'EUR', label: 'Euro (EUR)' },
          { abbr: 'GMD', label: 'Gambian Dalasi (GMD)' },
          { abbr: 'GHS', label: 'Ghanaian Cedi (GHS)' },
          { abbr: 'GNF', label: 'Guinean Franc (GNF)' },
          { abbr: 'INR', label: 'Indian Rupee (INR)' },
          { abbr: 'JPY', label: 'Japanese Yen (JPY)' },
          { abbr: 'KES', label: 'Kenyan Shilling (KES)' },
          { abbr: 'LSL', label: 'Lesotho Loti (LSL)' },
          { abbr: 'LRD', label: 'Liberian Dollar (LRD)' },
          { abbr: 'LYD', label: 'Libyan Dinar (LYD)' },
          { abbr: 'MGA', label: 'Malagasy Ariary (MGA)' },
          { abbr: 'MWK', label: 'Malawian Kwacha (MWK)' },
          { abbr: 'MRU', label: 'Mauritanian ouguiya (MRU)' },
          { abbr: 'MUR', label: 'Mauritian Rupee (MUR)' },
          { abbr: 'MAD', label: 'Moroccan Dirham (MAD)' },
          { abbr: 'MZM', label: 'Mozambican metical (MZM)' },
          { abbr: 'NAD', label: 'Namibian Dollar (NAD)' },
          { abbr: 'NGN', label: 'Nigerian Naira (NGN)' },
          { abbr: 'RWF', label: 'Rwandan Franc (RWF)' },
          { abbr: 'STD', label: 'São Tomé and Príncipe dobra' },
          { abbr: 'SCR', label: 'Seychellois Rupee (SCR)' },
          { abbr: 'SLL', label: 'Sierra Leonean Leone (SLL)' },
          { abbr: 'SOS', label: 'Somali Shilling (SOS)' },
          { abbr: 'ZAR', label: 'South African Rand (ZAR)' },
          { abbr: 'SSP', label: 'South Sudanese Pound (SSP)' },
          { abbr: 'SDG', label: 'Sudanese Pound (SDG)' },
          { abbr: 'SZL', label: 'Swazi Lilangeni (SZL)' },
          { abbr: 'CHF', label: 'Swiss Franc (CHF)' },
          { abbr: 'TZS', label: 'Tanzanian Shilling (TZS)' },
          { abbr: 'TND', label: 'Tunisian Dinar (TND)' },
          { abbr: 'UGX', label: 'Ugandan Shilling (UGX)' },
          { abbr: 'USD', label: 'United States Dollar (USD)' },
          { abbr: 'CFA', label: 'West African Franc (CFA)' },
          { abbr: 'ZMW', label: 'Zambian Kwacha (ZMW)' },
          { abbr: 'ZWL', label: 'Zimbabwean Dollar (ZWL)' },
          { abbr: 'USD', label: 'Multi-Currency - Local & USD' },
          { abbr: 'Euro', label: 'Multi-Currency - Local & Euro' },
          { abbr: 'Other', label: 'Multi-Currency - Local & Other' },
        ])
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
