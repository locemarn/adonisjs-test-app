import { test } from '@japa/runner'
import { User, UserProps } from '#domain/entities/user.entity'
import { UsersInMemoryRepository } from '#infra/db/in_memory/users_in_memory.repository'
let userProps: UserProps

test.group('Users infra db', (group) => {
  group.each.setup(() => {
    userProps = {
      username: 'usertest',
      email: 'usertest@gmail.com',
      password: 'password',
    }
  })

  test('should create a new user', async ({ assert }) => {
    const repo = new UsersInMemoryRepository()
    const user = new User(userProps)
    await repo.create(user)

    assert.instanceOf(repo.users[0], User)
    assert.lengthOf(repo.users, 1)
    assert.deepEqual(repo.users[0].props, userProps)
  })

  test('should get a user by id', async ({ assert }) => {
    const repo = new UsersInMemoryRepository()
    const user = new User(userProps)
    await repo.create(user)

    const userById = await repo.getUserById(user.id)
    assert.instanceOf(userById, User)
    assert.lengthOf(repo.users, 1)
    assert.deepEqual(repo.users[0].props, userProps)
  })

  test('should get a user by email', async ({ assert }) => {
    const repo = new UsersInMemoryRepository()
    const user = new User(userProps)
    await repo.create(user)

    const userByEmail = await repo.getUserByEmail(user.props.email)
    assert.instanceOf(userByEmail, User)
    assert.lengthOf(repo.users, 1)
    assert.deepEqual(repo.users[0].props, userProps)
  })

  test('should get a user by username', async ({ assert }) => {
    const repo = new UsersInMemoryRepository()
    const user = new User(userProps)
    await repo.create(user)

    const userByUsername = await repo.getUserByUsername(user.props.username)
    assert.instanceOf(userByUsername, User)
    assert.lengthOf(repo.users, 1)
    assert.deepEqual(repo.users[0].props, userProps)
  })
})
