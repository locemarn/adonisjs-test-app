import { test } from '@japa/runner'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { User } from '#domain/entities/user.entity'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases user create', () => {
  test('should create a new user', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    assert.instanceOf(user, User)
    assert.lengthOf(userRepo.users, 1)
    assert.deepEqual(userRepo.users[0].props, userProps)
  })
})
