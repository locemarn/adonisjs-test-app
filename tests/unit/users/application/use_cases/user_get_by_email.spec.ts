import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { User } from '#domain/entities/user.entity'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { GetUserByEmailUseCase } from '#application/use_cases/users/get_user_by_email.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases user get by email', () => {
  test('should get a user by email', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepo)
    const userByEmail = await getUserByEmailUseCase.execute(userProps.email)

    assert.instanceOf(userByEmail, User)
    assert.lengthOf(userRepo.getUsers(), 1)
    assert.deepEqual(userRepo.getUsers()[0].props, userProps)
  })
})
