import { UserRepository } from '#domain/repositories/user.repository'
import cash from '#services/cache_service'

export class GetUserByEmailUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string) {
    if (cash.has(email)) {
      return cash.get(email)
    }
    const user = await this.userRepo.getUserByEmail(email)
    return user
  }
}
