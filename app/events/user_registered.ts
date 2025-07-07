import { BaseEvent } from '@adonisjs/core/events'
import { User } from '#domain/entities/user.entity'

export default class UserRegistered extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor(public user: User) {
    super()
  }
}
