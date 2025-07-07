import { UserRepositoryInterface } from '#domain/repositories/user.repository'
// import cash from '#services/cache_service'

export class GetUserByUsernameUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(username: string) {
    // if (cash.has(username)) {
    //   return cash.get(username)
    // }
    const user = await this.userRepo.getUserByUsername(username)
    return user
  }
}
