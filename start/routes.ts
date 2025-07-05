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

        router
          .get('/:id', async (ctx) => {
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.getUserById(ctx.params.id)
            return res
          })
          .as('users.getUserById')

        router
          .get('/:email', async (ctx) => {
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.getUserByEmail(ctx.params.email)
            return res
          })
          .prefix('email')
          .as('users.getUserByEmail')

        router
          .get('/:username', async (ctx) => {
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.getUserByUsername(ctx.params.username)
            return res
          })
          .prefix('username')
          .as('users.getUserByUsername')

        router
          .put('/:id', async (ctx) => {
            const { username } = ctx.request.body()
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.updateUserUsername(ctx.params.id, username)
            return res
          })
          .prefix('username')
          .as('users.updateUserUsername')

        router
          .put('/:id', async (ctx) => {
            const { password } = ctx.request.body()
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.updateUserPassword(ctx.params.id, password)
            return res
          })
          .prefix('password')
          .as('users.updateUserPassword')

        router
          .delete('/:id', async (ctx) => {
            const userRepo = new UserLucidRepository()
            const userController = new UsersController(userRepo)
            const res = await userController.deleteUser(ctx.params.id)
            return res
          })
          .as('users.deleteUser')
      })
      .prefix('users')
  })
  .prefix('/api/v1')
