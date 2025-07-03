import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { User } from '#domain/entities/user.entity'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { GetUserByIdUseCase } from '#application/use_cases/users/get_user_by_id.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases user get by id', () => {
  test('should get a user by id', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const getUserByIdUseCase = new GetUserByIdUseCase(userRepo)
    const userById = await getUserByIdUseCase.execute(user.id)

    assert.instanceOf(userById, User)
    assert.lengthOf(userRepo.getUsers(), 1)
    assert.deepEqual(userRepo.getUsers()[0].props, userProps)
  })
})
