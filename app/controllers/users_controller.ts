import type { HttpContext } from '@adonisjs/core/http'

import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UserLucidRepository } from '#infra/db/lucid/user_lucid.repository'
import { UserProps } from '#domain/entities/user.entity'

export default class UsersController {
  constructor(private readonly userRepo: UserLucidRepository) {
    this.userRepo = new UserLucidRepository()
  }

  async createUser(ctx: HttpContext) {
    console.log(' ctx --->', ctx.request.body())
    const createUserUseCase = new CreateUserUseCase(this.userRepo)
    const newUser = await createUserUseCase.execute(ctx.request.body() as UserProps)
    return newUser
  }
}
