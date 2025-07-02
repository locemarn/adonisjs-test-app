import { test } from '@japa/runner'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { DeleteUserUseCase } from '#application/use_cases/users/delete_user.use_case'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('Users application use cases delete user', () => {
  test('should delete a user', async ({ assert }) => {
    const userRepo = new UsersInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepo)
    const user = await createUserUseCase.execute(userProps)

    const deleteUserUseCase = new DeleteUserUseCase(userRepo)
    await deleteUserUseCase.execute(user.id)

    const deletedUser = await userRepo.getUserById(user.id)
    assert.isNull(deletedUser)
  })
})
