import { UserRepositoryInterface } from '#domain/repositories/user.repository'
// import cash from '#services/cache_service'

export class GetUserByIdUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(id: number) {
    // if (cash.has(id.toString())) {
    //   return cash.get(id.toString())
    // }
    const user = await this.userRepo.getUserById(id)
    return user
  }
}
