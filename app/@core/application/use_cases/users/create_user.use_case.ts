import { UserProps } from '#domain/entities/user.entity'
import { UserRepositoryInterface } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
// import cash from '#services/cache_service'

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: UserProps) {
    const user = new User(input)
    const createdUser = await this.userRepo.create(user)
    // cash.set(input.username, user)
    return createdUser
  }
}
