import { User } from '#domain/entities/user.entity'
import { UserRepository } from '#domain/repositories/user.repository'

export class UsersInMemoryRepository implements UserRepository {
  users: User[] = []

  getUserById(id: string): Promise<User | null> {
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
