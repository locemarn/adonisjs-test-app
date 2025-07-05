import { User } from '#domain/entities/user.entity'
import { UserRepository } from '#domain/repositories/user.repository'
import redis from '@adonisjs/redis/services/main'

export class UserRedisRepository implements UserRepository {
  async getUserById(id: string): Promise<User | null> {
    const user = await redis.get(id)
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
    await redis.set(user.id, JSON.stringify(user))
    return user
  }
  async delete(id: string): Promise<void> {
    await redis.del(id)
  }
  async updateUsername(id: string, username: string): Promise<User> {
    const user = await this.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.username = username
    await redis.set(id, JSON.stringify(user))
    return user
  }
  async updatePassword(id: string, password: string): Promise<User> {
    const user = await this.getUserById(id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.password = password
    await redis.set(id, JSON.stringify(user))
    return user
  }
}
