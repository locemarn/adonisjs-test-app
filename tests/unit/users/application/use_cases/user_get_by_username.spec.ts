import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { User } from '#domain/entities/user.entity'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { GetUserByUsernameUseCase } from '#application/use_cases/users/get_user_by_username.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases user get by username', () => {
  test('should get a user by username', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const getUserByUsernameUseCase = new GetUserByUsernameUseCase(userRepo)
    const userByUsername = await getUserByUsernameUseCase.execute(userProps.username)

    assert.instanceOf(userByUsername, User)
    assert.lengthOf(userRepo.getUsers(), 1)
    assert.deepEqual(userRepo.getUsers()[0].props, userProps)
  })
})
