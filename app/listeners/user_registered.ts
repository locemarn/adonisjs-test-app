import type UserRegistered from '#events/user_registered'
import cacheService from '#services/cache_service'

export default class UserRegisteredListener {
  private cacheService: any
  constructor() {
    this.cacheService = cacheService
  }

  async handle(event: UserRegistered) {
    const [date, time] = new Date().toISOString().split('T')
    const userLog = {
      log: `User ${event.user.props.email} created with id: ${event.user.id}`,
      data: JSON.stringify(event.user),
      createdAt: `${date}:${time}`,
    }
    this.cacheService.set(`users:${event.user.props.email}`, event.user)
    this.cacheService.set(`logs:${date}:${time.split(':')[0]}`, userLog)
  }
}
