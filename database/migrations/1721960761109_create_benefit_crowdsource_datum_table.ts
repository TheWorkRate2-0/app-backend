import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'benefit_crowdsource_datum'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .string('crowdsource_datum_id')
        .references('id')
        .inTable('crowdsource_data')
        .notNullable()
      table.integer('benefit_id').unsigned().references('id').inTable('benefits').notNullable()
      table.unique(['crowdsource_datum_id', 'benefit_id'])
      table.integer('amount').nullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 3 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 4 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 7 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 13 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 16 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 18 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 19 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 22 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 23 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 25 },
        { crowdsource_datum_id: 'b32f09ab-a46b-4ead-9c79-f84c659194cd', benefit_id: 27 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 3 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 13 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 14 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 18 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 19 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 22 },
        { crowdsource_datum_id: 'ed212ff9-dec3-44c1-a209-75d661d06f13', benefit_id: 25 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 4 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 7 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 16 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 18 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 19 },
        { crowdsource_datum_id: '0b8db115-63f0-48be-acca-65fa3be82f58', benefit_id: 27 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 4 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 7 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 13 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 14 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 18 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 19 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 22 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 23 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 25 },
        { crowdsource_datum_id: '2c904762-87a2-4b28-8e5c-23e8a581d17a', benefit_id: 27 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 3 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 7 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 8 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 13 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 16 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 18 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 19 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 20 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 22 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 23 },
        { crowdsource_datum_id: '39b5792f-d832-47ce-9eb0-6af18fd35989', benefit_id: 25 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 3 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 7 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 8 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 13 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 18 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 19 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 20 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 22 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 23 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 25 },
        { crowdsource_datum_id: '3aac253d-9e78-4fd4-ba16-e94ec6ee9888', benefit_id: 29 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 3 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 4 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 7 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 10 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 11 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 12 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 13 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 14 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 16 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 18 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 19 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 22 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 23 },
        { crowdsource_datum_id: '7bbb07b5-6e8f-45fb-912a-0c981740a40e', benefit_id: 25 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 4 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 7 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 10 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 12 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 13 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 16 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 18 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 19 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 22 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 23 },
        { crowdsource_datum_id: '90d196ff-b7b9-475d-aa5c-5911e16a812e', benefit_id: 27 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 10 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 12 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 13 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 18 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 19 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 22 },
        { crowdsource_datum_id: '94899698-de32-497a-9818-1e3ac34edfeb', benefit_id: 23 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 1 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 10 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 12 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 13 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 18 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 19 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 22 },
        { crowdsource_datum_id: 'b89a782d-c24a-48a8-89e6-c69a38d4f76a', benefit_id: 23 },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
