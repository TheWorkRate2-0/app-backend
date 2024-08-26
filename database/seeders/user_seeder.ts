import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.with('crowdsource', 1, (crowdsource) =>
      crowdsource.with('benefits', 5)
    ).createMany(50)
  }
}
