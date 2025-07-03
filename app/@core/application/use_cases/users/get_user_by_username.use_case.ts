import { UserRepository } from '#domain/repositories/user.repository'
import cash from '#services/cache_service'

export class GetUserByUsernameUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string) {
    if (cash.has(username)) {
      return cash.get(username)
    }
    const user = await this.userRepo.getUserByUsername(username)
    return user
  }
}
