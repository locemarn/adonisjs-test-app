import { test } from '@japa/runner'
import { User } from '#domain/entities/user.entity'

// Users Entity - Create
test.group('Users Entity - Create', () => {
  test('should create a user', async ({ assert }) => {
    const user = new User({
      username: 'usertester',
      email: 'usertester@gmail.com',
      password: 'password',
    })

    assert.instanceOf(user, User)
    assert.equal(user.getUsername(), 'usertester')
    assert.equal(user.getEmail(), 'usertester@gmail.com')
    assert.equal(user.getPassword(), 'password')
    assert.isString(user.id)
  })

  test('should throw an error if username is empty', async ({ assert }) => {
    assert.throws(
      () =>
        new User({
          username: '',
          email: 'usertester@gmail.com',
          password: 'password',
        }),
      'Invalid user props.'
    )
  })

  test('should throw an error if email is empty', async ({ assert }) => {
    assert.throws(
      () =>
        new User({
          username: 'usertester',
          email: '',
          password: 'password',
        }),
      'Invalid user props.'
    )
  })

  test('should throw an error if password is empty', async ({ assert }) => {
    assert.throws(
      () =>
        new User({
          username: 'usertester',
          email: 'usertester@gmail.com',
          password: '',
        }),
      'Invalid user props.'
    )
  })
})

// Users Entity - Update
test.group('Users Entity - Update', () => {
  test('should update a username', async ({ assert }) => {
    const newUser = new User({
      username: 'usertester',
      email: 'usertester@gmail.com',
      password: 'password',
    })

    newUser.updateUsername('usertester2')
    assert.equal(newUser.getUsername(), 'usertester2')
  })

  test('should throw an error if username is empty', async ({ assert }) => {
    assert.throws(
      () =>
        new User({
          username: 'usertester',
          email: 'usertester@gmail.com',
          password: 'password',
        }).updateUsername(''),
      'Invalid username.'
    )
  })

  test('should update a password', async ({ assert }) => {
    const newUser = new User({
      username: 'usertester',
      email: 'usertester@gmail.com',
      password: 'password',
    })

    newUser.updatePassword('password2')
    assert.equal(newUser.getPassword(), 'password2')
  })

  test('should throw an error if password is empty', async ({ assert }) => {
    assert.throws(
      () =>
        new User({
          username: 'usertester',
          email: 'usertester@gmail.com',
          password: 'password',
        }).updatePassword(''),
      'Invalid password.'
    )
  })
})

// Users Entity to JSON
test.group('Users Entity to JSON', () => {
  test('should return a JSON object', async ({ assert }) => {
    const user = new User({
      username: 'usertester',
      email: 'usertester@gmail.com',
      password: 'password',
    })

    assert.deepEqual(user.toJSON(), {
      id: user.id,
      username: 'usertester',
      email: 'usertester@gmail.com',
      password: 'password',
    })
  })
})
