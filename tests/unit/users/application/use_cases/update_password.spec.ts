import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UpdatePasswordUseCase } from '#application/use_cases/users/update_password.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases update password', () => {
  test('should update a password', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const updatePasswordUseCase = new UpdatePasswordUseCase(userRepo)
    await updatePasswordUseCase.execute(user.id, 'password2')

    const users = userRepo.getUsers()
    assert.lengthOf(users, 1)
    assert.deepEqual(users[0].props, { ...userProps, password: 'password2' })
  })
})
