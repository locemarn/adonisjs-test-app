import vine from '@vinejs/vine'

/**
 * User Create Validator
 */
export const userCreateValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6).maxLength(255),
  })
)

/**
 * User GetById Validator
 */
export const userGetByIdValidator = vine.compile(vine.object({ id: vine.number() }))

/**
 * User GetByEmail Validator
 */
export const userGetByEmailValidator = vine.compile(
  vine.object({ email: vine.string().trim().email() })
)

/**
 * User GetByUsername Validator
 */
export const userGetByUsernameValidator = vine.compile(
  vine.object({ username: vine.string().trim().minLength(3).maxLength(255) })
)

/**
 * updateUserUsername Validator
 */
export const updateUserUsernameValidator = vine.compile(
  vine.object({ username: vine.string().trim().minLength(3).maxLength(255) })
)

/**
 * updateUserPassword Validator
 */
export const updateUserPasswordValidator = vine.compile(
  vine.object({ password: vine.string().trim().minLength(6).maxLength(255) })
)

/**
 * deleteUser Validator
 */
export const deleteUserValidator = vine.compile(vine.object({ id: vine.number() }))
