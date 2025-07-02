import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'

export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, password: string): Promise<User> {
    return this.userRepository.updatePassword(id, password)
  }
}
