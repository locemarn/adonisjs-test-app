import { test } from '@japa/runner'
import sinon from 'sinon'
import User from '#models/user'
import { UserLucidRepository } from '#infra/db/lucid/user_lucid.repository'
import { User as UserDomain } from '#domain/entities/user.entity'

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
    const userDomain = new UserDomain(userProps)

    const userModelInstance = new User()
    userModelInstance.fill(userProps)
    userModelInstance.id = 1

    const createStub = sandbox.stub(User, 'create').resolves(userModelInstance)
    const newUser = await repository.create(userDomain)

    assert.instanceOf(newUser, UserDomain)
    assert.equal(newUser.getUsername(), userDomain.getUsername())
    assert.equal(newUser.getEmail(), userDomain.getEmail())
    assert.equal(newUser.getPassword(), userDomain.getPassword())
    assert.isDefined(newUser.id)
    assert.equal(newUser.id, userModelInstance.id.toString())
    assert.isTrue(createStub.calledOnceWith(userDomain.props))
  })

  test('should get a user by ID', async ({ assert }) => {
    const userDomain = new UserDomain(userProps, '1')

    const userModelInstance = new User()
    userModelInstance.fill(userProps)
    userModelInstance.id = 1

    const findStub = sandbox.stub(User, 'find').resolves(userModelInstance)

    const foundUser = await repository.getUserById('1')

    assert.instanceOf(foundUser, UserDomain)
    assert.equal(foundUser?.id, userDomain.id)
    assert.equal(foundUser?.getUsername(), userDomain.getUsername())
    assert.isTrue(findStub.calledOnceWith('1'))
  })

  test('should return null if user not found by ID', async ({ assert }) => {
    const findStub = sandbox.stub(User, 'find').resolves(null)

    const foundUser = await repository.getUserById('999')

    assert.isNull(foundUser)
    assert.isTrue(findStub.calledOnceWith('999'))
  })

  test('should update username', async ({ assert }) => {
    const userId = '1'
    const newUsername = 'updatedUser'

    const userDomain = new UserDomain(userProps, userId)

    const findUserStubModel = new User()
    findUserStubModel.fill(userProps)
    findUserStubModel.id = 1
    const updatedUserStubModel = new User()
    updatedUserStubModel.fill({ ...userProps, username: newUsername })
    updatedUserStubModel.id = 1

    const findStub = sandbox.stub(User, 'find').resolves(findUserStubModel)
    const updateOrCreateStub = sandbox.stub(User, 'updateOrCreate').resolves(updatedUserStubModel)

    const updatedUser = await repository.updateUsername(userId, newUsername)

    assert.instanceOf(updatedUser, UserDomain)
    assert.equal(updatedUser.id, userId)
    assert.equal(updatedUser.getUsername(), newUsername)
    assert.isTrue(findStub.calledOnceWith(userId))
    assert.isTrue(
      updateOrCreateStub.calledOnceWith({ id: Number(userId) }, { username: newUsername })
    )
  })

  test('should throw error if user not found for username update', async ({ assert }) => {
    const findStub = sandbox.stub(User, 'find').resolves(null)

    await assert.rejects(() => repository.updateUsername('999', 'nonExistent'), 'User not found')
    assert.isTrue(findStub.calledOnceWith('999'))
  })
})
