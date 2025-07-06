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
import { UserRepositoryInterface } from '#domain/repositories/user.repository'

export default class UsersController {
  private readonly userRepo: UserRepositoryInterface

  constructor() {
    this.userRepo = new UserLucidRepository()
  }

  async createUser({ request, response }: HttpContext) {
    try {
      const createUserUseCase = new CreateUserUseCase(this.userRepo)
      const newUser = await createUserUseCase.execute(request.body() as UserProps)
      response.status(201).json({ data: newUser, message: 'User created', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async getUserById({ params, response }: HttpContext) {
    try {
      const getUserByIdUseCase = new GetUserByIdUseCase(this.userRepo)
      const user = await getUserByIdUseCase.execute(Number(params.id))
      response.status(200).json({ data: user, message: 'User found', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async getUserByEmail({ params, response }: HttpContext) {
    try {
      const getUserByEmailUseCase = new GetUserByEmailUseCase(this.userRepo)
      const user = await getUserByEmailUseCase.execute(params.email)
      response.status(200).json({ data: user, message: 'User found', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async getUserByUsername({ params, response }: HttpContext) {
    try {
      const getUserByUsernameUseCase = new GetUserByUsernameUseCase(this.userRepo)
      const user = await getUserByUsernameUseCase.execute(params.username)
      response.status(200).json({ data: user, message: 'User found', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async updateUserUsername({ params, request, response }: HttpContext) {
    try {
      const { username } = request.body()
      const updateUsernameUseCase = new UpdateUsernameUseCase(this.userRepo)
      const user = await updateUsernameUseCase.execute(Number(params.id), username)
      response.status(200).json({ data: user, message: 'User updated', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async updateUserPassword({ params, request, response }: HttpContext) {
    try {
      const { password } = request.body()
      const updatePasswordUseCase = new UpdatePasswordUseCase(this.userRepo)
      const user = await updatePasswordUseCase.execute(Number(params.id), password)
      response.status(200).json({ data: user, message: 'User updated', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }

  async deleteUser({ params, response }: HttpContext) {
    try {
      const deleteUserUseCase = new DeleteUserUseCase(this.userRepo)
      await deleteUserUseCase.execute(Number(params.id))
      response.status(200).json({ message: 'User deleted', error: false })
    } catch (error) {
      response.status(400).json({ message: error.detail, error: true })
    }
  }
}
