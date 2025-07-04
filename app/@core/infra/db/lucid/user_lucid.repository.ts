import { UserRepository } from '#domain/repositories/user.repository'
import User from '#models/user'

export class UserLucidRepository implements UserRepository {
  constructor() {}

  async getUserById(id: string): Promise<User | null> {
    return await User.find(id)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await User.findBy({ email })
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await User.findBy({ username })
  }

  async create(user: User): Promise<User> {
    return await User.create(user)
  }

  async delete(id: string): Promise<void> {
    const user = await User.findOrFail(id)
    return await user.delete()
  }

  async updateUsername(id: string, username: string): Promise<User> {
    const findUser = await User.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await User.updateOrCreate({ id: Number(id) }, { username })
    return user
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const findUser = await User.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await User.updateOrCreate({ id: Number(id) }, { password })
    return user
  }
}
