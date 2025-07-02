import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UpdateUsernameUseCase } from '#application/use_cases/users/update_username.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases update username', () => {
  test('should update a username', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const updateUsernameUseCase = new UpdateUsernameUseCase(userRepo)
    await updateUsernameUseCase.execute(user.id, 'usertest2')

    const users = userRepo.getUsers()
    assert.lengthOf(users, 1)
    assert.deepEqual(users[0].props, { ...userProps, username: 'usertest2' })
  })
})
