import { UserRepositoryInterface } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
// import cash from '#services/cache_service'

export class UpdateUsernameUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number, username: string): Promise<User> {
    // if (cash.has(id.toString())) {
    //   const user = cash.get(id.toString())
    //   user.username = username
    //   cash.set(id.toString(), user)
    //   return user
    // }
    return this.userRepository.updateUsername(id, username)
  }
}
