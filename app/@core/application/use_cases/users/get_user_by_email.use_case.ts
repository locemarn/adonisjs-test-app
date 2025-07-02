import { UserRepository } from '#domain/repositories/user.repository'

export class GetUserByEmailUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string) {
    const user = await this.userRepo.getUserByEmail(email)
    return user
  }
}
