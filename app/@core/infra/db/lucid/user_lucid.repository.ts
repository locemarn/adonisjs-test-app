import { UserRepositoryInterface } from '#domain/repositories/user.repository'
import UserModel from '#models/user'
import { User as DomainUser, UserProps } from '#domain/entities/user.entity'
import UserRegistered from '#events/user_registered'

export class UserLucidRepository implements UserRepositoryInterface {
  constructor() {}

  async getUserById(id: number): Promise<DomainUser | null> {
    const user = await UserModel.find(id)
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id)
  }

  async getUserByEmail(email: string): Promise<DomainUser | null> {
    const user = await UserModel.findBy({ email })
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id)
  }

  async getUserByUsername(username: string): Promise<DomainUser | null> {
    const user = await UserModel.findBy({ username })
    if (!user) {
      return null
    }
    return new DomainUser(user as UserProps, user.id)
  }

  async create(user: DomainUser): Promise<DomainUser> {
    try {
      const createdUser = await UserModel.create(user.props)
      const userDomain = new DomainUser(createdUser, createdUser.id)
      UserRegistered.dispatch(userDomain)
      return userDomain
    } catch (error) {
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    const user = await UserModel.findOrFail(id)
    await user.delete()
  }

  async updateUsername(id: number, username: string): Promise<DomainUser> {
    const findUser = await UserModel.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await UserModel.updateOrCreate({ id }, { username })
    return new DomainUser(user as UserProps, user.id)
  }

  async updatePassword(id: number, password: string): Promise<DomainUser> {
    const findUser = await UserModel.find(id)
    if (!findUser) {
      throw new Error('User not found')
    }
    const user = await UserModel.updateOrCreate({ id }, { password })
    return new DomainUser(user as UserProps, user.id)
  }
}
