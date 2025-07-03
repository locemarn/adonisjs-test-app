import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
import cash from '#services/cache_service'

export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, password: string): Promise<User> {
    if (cash.has(id)) {
      const user = cash.get(id)
      user.password = password
      cash.set(id, user)
      return user
    }
    return this.userRepository.updatePassword(id, password)
  }
}
