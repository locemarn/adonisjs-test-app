import { UserRepositoryInterface } from '#domain/repositories/user.repository'
// import cash from '#services/cache_service'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number): Promise<void> {
    // cash.delete(id.toString())
    await this.userRepository.delete(id)
  }
}
