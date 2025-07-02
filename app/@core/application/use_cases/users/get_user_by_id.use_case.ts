import { UserRepository } from '#domain/repositories/user.repository'

export class GetUserByIdUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.getUserById(id)
    return user
  }
}
