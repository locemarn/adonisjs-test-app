import { UserProps } from '#domain/entities/user.entity'
import { UserRepository } from '#domain/repositories/user.repository'
import { User } from '#domain/entities/user.entity'

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: UserProps) {
    const user = new User(input)
    await this.userRepo.create(user)
    return user
  }
}
