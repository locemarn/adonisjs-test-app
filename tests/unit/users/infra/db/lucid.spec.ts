import { test } from '@japa/runner'
import sinon from 'sinon'
import User from '#models/user'
import { UserLucidRepository } from '#infra/db/lucid/user_lucid.repository'

const userProps = {
  username: 'usertest',
  email: 'usertest@gmail.com',
  password: 'password',
}

test.group('UserLucidRepository', (group) => {
  let sandbox: sinon.SinonSandbox
  let repository: UserLucidRepository

  group.setup(() => {
    sandbox = sinon.createSandbox()
    repository = new UserLucidRepository()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })

  test('should create a new user', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }

    sandbox.stub(User, 'create').resolves(fakeUser as any)

    const user = await repository.create(fakeUser as any)
    assert.deepEqual(user, fakeUser)
  })

  test('should get a user by id', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }

    sandbox.stub(User, 'find').resolves(fakeUser as any)

    const user = await repository.getUserById('123abc')
    assert.deepEqual(user, fakeUser)
  })

  test('should get a user by email', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }

    sandbox
      .stub(User, 'findBy')
      .withArgs({ email: 'usertest@gmail.com' } as any)
      .resolves(fakeUser as any)

    const user = await repository.getUserByEmail('usertest@gmail.com')
    assert.deepEqual(user, fakeUser)
  })

  test('should get a user by username', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }

    sandbox
      .stub(User, 'findBy')
      .withArgs({ username: 'usertest' } as any)
      .resolves(fakeUser as any)

    const user = await repository.getUserByUsername('usertest')
    assert.deepEqual(user, fakeUser)
  })

  test('should delete a user', async ({ assert }) => {
    const fakeUser = { delete: sandbox.stub().resolves() }
    sandbox.stub(User, 'findOrFail').resolves(fakeUser as any)

    await repository.delete('123abc')

    assert.isTrue(fakeUser.delete.calledOnce)
  })

  test('should update a username', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }
    const updatedUser = {
      ...fakeUser,
      username: 'usertestupdated',
    }

    sandbox.stub(User, 'find').resolves(fakeUser as any)
    sandbox.stub(User, 'updateOrCreate').resolves(updatedUser as any)

    const user = await repository.updateUsername('123abc', 'usertestupdated')
    assert.equal(user, updatedUser)
  })

  test('should update a password', async ({ assert }) => {
    const fakeUser = {
      ...userProps,
      id: '123abc',
    }
    const updatedUser = {
      ...fakeUser,
      password: 'passwordupdated',
    }

    sandbox.stub(User, 'find').resolves(fakeUser as any)
    sandbox.stub(User, 'updateOrCreate').resolves(updatedUser as any)

    const user = await repository.updatePassword('123abc', 'passwordupdated')
    assert.equal(user, updatedUser)
  })

  test('updateUsername throws if user not found', async ({ assert }) => {
    sandbox.stub(User, 'find').resolves(null)

    await assert.rejects(async () => {
      await repository.updateUsername('123abc', 'any')
    }, /User not found/)
  })

  test('updatePassword throws if user not found', async ({ assert }) => {
    sandbox.stub(User, 'find').resolves(null)

    await assert.rejects(async () => {
      await repository.updatePassword('123abc', 'any')
    }, /User not found/)
  })
})
