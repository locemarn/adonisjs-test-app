import { User } from '../entities/user.entity.js'

export interface UserRepository {
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByUsername(username: string): Promise<User | null>
  create(user: User): Promise<User>
}
