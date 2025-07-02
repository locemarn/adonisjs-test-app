import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'

export class UpdateUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, username: string): Promise<User> {
    return this.userRepository.updateUsername(id, username)
  }
}
