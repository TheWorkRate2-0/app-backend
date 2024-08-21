import { BaseSchema } from '@adonisjs/lucid/schema'
import Statuses from '#enums/statuses'

export default class extends BaseSchema {
  protected tableName = 'statuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { id: Statuses.suspended, name: 'suspended' },
        { id: Statuses.active, name: 'active' },
        { id: Statuses.deleted, name: 'deleted' },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}