import { User } from '#domain/entities/user.entity'
import { UserRepositoryInterface } from '#domain/repositories/user.repository'
import redis from '@adonisjs/redis/services/main'

export class UserRedisRepository implements UserRepositoryInterface {
  async getUserById(id: number): Promise<User | null> {
    const user = await redis.get(id.toString())
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await redis.get(email)
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }
  async getUserByUsername(username: string): Promise<User | null> {
    const user = await redis.get(username)
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }
  async create(user: User): Promise<User> {
    if (!user.id) {
      throw new Error('User ID is required')
    }
    await redis.set(user.id.toString(), JSON.stringify(user))
    return user
  }
  async delete(id: number): Promise<void> {
    await redis.del(id.toString())
  }
  async updateUsername(id: number, username: string): Promise<User> {
    const user = await this.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.username = username
    await redis.set(id.toString(), JSON.stringify(user))
    return user
  }
  async updatePassword(id: number, password: string): Promise<User> {
    const user = await this.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.password = password
    await redis.set(id.toString(), JSON.stringify(user))
    return user
  }
}
