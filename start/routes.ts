/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
import emitter from '@adonisjs/core/services/emitter'
import UserRegistered from '#events/user_registered'
import UserRegisteredListener from '#listeners/user_registered'

/**
 * Listen to events
 */
emitter.listen(UserRegistered, [UserRegisteredListener])
// emitter.onAny((name, event) => {
//   console.info('Listening to event emitter --->')
//   console.info('name:', name)
//   console.info('event:', event)
// })

/**
 * Handle events errors
 */
emitter.onError((event, error, eventData) => {
  console.info('Event emitter error --->')
  console.info('event', event)
  console.error('error', error)
  console.info('eventData', eventData)
  console.info('Event emitter error end --->')
})

/**
 * Routes
 */
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    /**
     * Users Routes
     */
    router
      .group(() => {
        router.post('/', [UsersController, 'createUser']).as('users.createUser')

        router.get('/:id', [UsersController, 'getUserById']).as('users.getUserById')

        router
          .get('/:email', [UsersController, 'getUserByEmail'])
          .prefix('email')
          .as('users.getUserByEmail')

        router
          .get('/:username', [UsersController, 'getUserByUsername'])
          .prefix('username')
          .as('users.getUserByUsername')

        router
          .put('/:id', [UsersController, 'updateUserUsername'])
          .prefix('username')
          .as('users.updateUserUsername')

        router
          .put('/:id', [UsersController, 'updateUserPassword'])
          .prefix('password')
          .as('users.updateUserPassword')

        router.delete('/:id', [UsersController, 'deleteUser']).as('users.deleteUser')
      })
      .prefix('users')
  })
  .prefix('/api/v1')
