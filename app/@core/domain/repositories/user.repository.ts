import User from '#models/user'

export interface UserRepository {
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByUsername(username: string): Promise<User | null>
  create(user: User): Promise<User>
  delete(id: string): Promise<void>
  updateUsername(id: string, username: string): Promise<User>
  updatePassword(id: string, password: string): Promise<User>
}
