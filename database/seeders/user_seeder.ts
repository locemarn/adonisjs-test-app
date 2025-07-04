import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'seeder 1',
        email: 'seeder1@gmail.com',
        password: 'password',
      },
      {
        username: 'seeder 2',
        email: 'seeder2@gmail.com',
        password: 'password',
      },
    ])
  }
}
