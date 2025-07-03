import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
import cash from '#services/cache_service'

export class UpdateUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, username: string): Promise<User> {
    if (cash.has(id)) {
      const user = cash.get(id)
      user.username = username
      cash.set(id, user)
      return user
    }
    return this.userRepository.updateUsername(id, username)
  }
}
