import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#enums/roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: Roles.user,
          name: 'user',
        },
        {
          id: Roles.organisation,
          name: 'organisation',
        },
        {
          id: Roles.moderator,
          name: 'moderator',
        },
        {
          id: Roles.admin,
          name: 'admin',
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
