import { User } from '#domain/entities/user.entity'

export interface UserRepositoryInterface {
  getUserById(id: number): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByUsername(username: string): Promise<User | null>
  create(user: User): Promise<User>
  delete(id: number): Promise<void>
  updateUsername(id: number, username: string): Promise<User>
  updatePassword(id: number, password: string): Promise<User>
}
