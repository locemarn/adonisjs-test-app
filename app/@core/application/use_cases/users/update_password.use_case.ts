import { UserRepositoryInterface } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
// import cash from '#services/cache_service'

export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number, password: string): Promise<User> {
    // if (cash.has(id.toString())) {
    //   const user = cash.get(id.toString())
    //   user.password = password
    //   cash.set(id.toString(), user)
    //   return user
    // }
    return this.userRepository.updatePassword(id, password)
  }
}
