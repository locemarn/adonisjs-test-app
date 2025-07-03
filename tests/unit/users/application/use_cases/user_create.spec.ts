import { test } from '@japa/runner'
import { CreateUserUseCase } from '#application/use_cases/users/create_user.use_case'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
import { User } from '#domain/entities/user.entity'
import { UserRedisRepository } from '#infra/db/redis/user_redis.repository'

const userProps = {
  username: 'usertest1',
  email: 'usertest1@gmail.com',
  password: 'password',
}

test.group('Users application use cases user create', () => {
  test('should create a new user', async ({ assert }) => {
    // const userRepo = new UsersInMemoryRepository()
    const cashRepo = new UserRedisRepository()
    const createUserUseCase = new CreateUserUseCase(cashRepo)
    const user = await createUserUseCase.execute(userProps)

    assert.instanceOf(user, User)
    // const users = cashRepo.getUsers()
    // assert.lengthOf(users, 1)
    // assert.deepEqual(users[0].props, userProps)
  })
})
