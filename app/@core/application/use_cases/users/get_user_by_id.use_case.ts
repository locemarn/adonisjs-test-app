import { UserRepository } from '#domain/repositories/user.repository'
import cash from '#services/cache_service'

export class GetUserByIdUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string) {
    if (cash.has(id)) {
      return cash.get(id)
    }
    const user = await this.userRepo.getUserById(id)
    return user
  }
}
