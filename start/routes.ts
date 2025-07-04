/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import { UserLucidRepository } from '#infra/db/lucid/user_lucid.repository'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // Users Routes
    router
      .group(() => {
        router
          .post('/', async (ctx) => {
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.createUser(ctx)
            return res
          })
          .as('users.createUser')
      })
      .prefix('users')
  })
  .prefix('/api/v1')
