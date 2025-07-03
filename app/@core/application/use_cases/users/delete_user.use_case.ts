import { UserRepository } from '#domain/repositories/user.repository'
import cash from '#services/cache_service'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    cash.delete(id)
    await this.userRepository.delete(id)
  }
}
