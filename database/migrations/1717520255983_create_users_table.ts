import { BaseSchema } from '@adonisjs/lucid/schema'
import Statuses from '#enums/statuses'
import Roles from '#enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(Roles.user)
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .defaultTo(Statuses.suspended)
      table.boolean('email_verified').notNullable().defaultTo(false)
      table.string('name').nullable()
      table.json('avatar').nullable()
      table.string('public_pic').nullable()
      table.string('auth_type').notNullable().defaultTo('app')
      table.string('email', 254).notNullable().unique()
      table.string('password').nullable()
      table.string('remember_me_token').nullable()
      table.integer('credits').nullable()
      table.boolean('temporary_password').nullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: 'e8960a39-7319-46c6-ac01-ed784bd13ec7',
          role_id: Roles.admin,
          status_id: Statuses.active,
          email_verified: true,
          email: 'test@gmail.com',
          name: 'Bernard Kairu',
          password:
            '$scrypt$n=16384,r=8,p=1$MGK3Bguc6saRta5bAPUtLg$MRRcwEx1xQvtp+coI3A+/1ABnNpNe3SWIpsM0bvJN8xRnajX6T4JmwWf0ws50EhBm+JfOQBvBxkPSKBGTcYwbQ',
          remember_me_token: null,
          created_at: '2023-08-21 01:19:15',
          updated_at: '2023-08-21 01:19:15',
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
