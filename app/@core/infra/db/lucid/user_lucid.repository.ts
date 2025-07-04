import { UserRepository } from '#domain/repositories/user.repository'
import UserModel from '#models/user'
import { User as DomainUser, UserProps } from '#domain/entities/user.entity'

export class UserLucidRepository implements UserRepository {
  constructor() {}

  async getUserById(id: string): Promise<DomainUser | null> {
    const user = await UserModel.find(id)
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id.toString())
  }

  async getUserByEmail(email: string): Promise<DomainUser | null> {
    const user = await UserModel.findBy({ email })
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id.toString())
  }

  async getUserByUsername(username: string): Promise<DomainUser | null> {
    const user = await UserModel.findBy({ username })
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id.toString())
  }

  async create(user: DomainUser): Promise<DomainUser> {
    const createdUser = await UserModel.create(user.props)
    return new DomainUser(createdUser as UserProps, createdUser.id.toString())
  }

  async delete(id: string): Promise<void> {
    const user = await UserModel.findOrFail(id)
    await user.delete()
  }

  async updateUsername(id: string, username: string): Promise<DomainUser> {
    const findUser = await UserModel.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await UserModel.updateOrCreate({ id: Number(id) }, { username })
    return new DomainUser(user as UserProps, user.id.toString())
  }

  async updatePassword(id: string, password: string): Promise<DomainUser> {
    const findUser = await UserModel.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await UserModel.updateOrCreate({ id: Number(id) }, { password })
    return new DomainUser(user as UserProps, user.id.toString())
  }
}
