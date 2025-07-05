import { User } from '#domain/entities/user.entity'
import { UserRepositoryInterface } from '#domain/repositories/user.repository'

export class UsersInMemoryRepository implements UserRepositoryInterface {
  private users: User[] = []

  getUsers(): User[] {
    return this.users
  }

  updateUsername(id: number, username: string): Promise<User> {
    const user = this.users.find((u) => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.username = username
    return Promise.resolve(user)
  }
  updatePassword(id: number, password: string): Promise<User> {
    const user = this.users.find((u) => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    user.props.password = password
    return Promise.resolve(user)
  }
  delete(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
    return Promise.resolve()
  }

  getUserById(id: number): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.id === id) ?? null)
  }

  getUserByEmail(email: string): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.props.email === email) ?? null)
  }

  getUserByUsername(username: string): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.props.username === username) ?? null)
  }

  create(user: User): Promise<User> {
    this.users.push(user)
    return Promise.resolve(user)
  }
}
