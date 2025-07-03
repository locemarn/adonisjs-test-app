import { UserProps } from '#domain/entities/user.entity'
import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'
import cash from '#services/cache_service'

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: UserProps) {
    if (cash.has(input.username)) {
      throw new Error('User already exists')
    }

    const user = new User(input)
    await this.userRepo.create(user)
    cash.set(input.username, user)
    return user
  }
}
