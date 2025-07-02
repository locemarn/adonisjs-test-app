import { UserRepository } from '#domain/repositories/user.repository'

export class GetUserByUsernameUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string) {
    const user = await this.userRepo.getUserByUsername(username)
    return user
  }
}
