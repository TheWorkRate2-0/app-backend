import User from '#models/user'
import Roles from '#enums/roles'
import Statuses from '#enums/statuses'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async accounts({ auth, request, response }: HttpContext) {
    if (auth.user && auth.user.isAdmin) {
      const query = request.only(['role', 'status', 'search', 'page', 'limit'])
      const page = query.page ?? 1
      const limit = query.limit ?? 20
      let userQuery = User.query()

      if (query.role) {
        if (!Roles[query.role]) {
          return response.badRequest({ errors: [{ message: 'No such role exists' }] })
        }
        userQuery = userQuery.where('role_id', Roles[query.role])
      }

      if (query.status) {
        if (!Statuses[query.status] && query.status !== 'unverified') {
          return response.badRequest({ errors: [{ message: 'No such status exists' }] })
        }
        if (query.status === 'unverified') {
          userQuery = userQuery.where('email_verified', false)
        } else {
          userQuery = userQuery.where('status_id', Statuses[query.status])
        }
      }

      if (query.search) {
        const searchTerm = query.search
        userQuery = userQuery
          .where((searchQuery) => searchQuery.whereILike('name', '%' + searchTerm + '%'))
          .orWhere((searchQuery) => searchQuery.whereILike('email', '%' + searchTerm + '%'))
      }

      const meta = await User.extendedMeta()

      const users = await userQuery
        .where('id', '<>', auth.user!.id)
        .whereNot('role_id', Roles.admin)
        .orderBy('created_at', 'desc')
        .preload('role')
        .preload('status')
        .paginate(page, limit)

      await User.userStatuses(users)
      const serializedUsers = users.serialize()
      Object.assign(serializedUsers.meta, meta)
      return response.json(serializedUsers)
    } else {
      return response.forbidden({
        errors: [{ message: 'You are not allowed to perform this action.' }],
      })
    }
  }

  async prepareUserData(user: any) {
    await user.preload('role')
    await user.load('status')
    return user
  }
}
