import type { HttpContext } from '@adonisjs/core/http'

import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UserLucidRepository } from '#infra/db/lucid/user_lucid.repository'
import { UserProps } from '#domain/entities/user.entity'
import { GetUserByIdUseCase } from '#application/use_cases/users/get_user_by_id.use_case'
import { UpdateUsernameUseCase } from '#application/use_cases/users/update_username.use_case'
import { GetUserByEmailUseCase } from '#application/use_cases/users/get_user_by_email.use_case'
import { GetUserByUsernameUseCase } from '#application/use_cases/users/get_user_by_username.use_case'
import { DeleteUserUseCase } from '#application/use_cases/users/delete_user.use_case'
import { UpdatePasswordUseCase } from '#application/use_cases/users/update_password.use_case'

export default class UsersController {
  constructor(private readonly userRepo: UserLucidRepository) {
    this.userRepo = new UserLucidRepository()
  }

  async createUser(ctx: HttpContext) {
    const createUserUseCase = new CreateUserUseCase(this.userRepo)
    const newUser = await createUserUseCase.execute(ctx.request.body() as UserProps)
    return newUser
  }

  async getUserById(id: number) {
    const getUserByIdUseCase = new GetUserByIdUseCase(this.userRepo)
    const user = await getUserByIdUseCase.execute(id)
    return user
  }

  async getUserByEmail(email: string) {
    const getUserByEmailUseCase = new GetUserByEmailUseCase(this.userRepo)
    const user = await getUserByEmailUseCase.execute(email)
    return user
  }

  async getUserByUsername(username: string) {
    const getUserByUsernameUseCase = new GetUserByUsernameUseCase(this.userRepo)
    const user = await getUserByUsernameUseCase.execute(username)
    return user
  }

  async updateUserUsername(id: number, username: string) {
    const updateUsernameUseCase = new UpdateUsernameUseCase(this.userRepo)
    const user = await updateUsernameUseCase.execute(id, username)
    return user
  }

  async updateUserPassword(id: number, password: string) {
    const updatePasswordUseCase = new UpdatePasswordUseCase(this.userRepo)
    const user = await updatePasswordUseCase.execute(id, password)
    return user
  }

  async deleteUser(id: number) {
    const deleteUserUseCase = new DeleteUserUseCase(this.userRepo)
    await deleteUserUseCase.execute(id)
    return 'User deleted'
  }
}
