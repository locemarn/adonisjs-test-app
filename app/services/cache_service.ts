import { RedisConnection } from '@adonisjs/redis'
import redis from '@adonisjs/redis/services/main'

class CacheService {
  #store: RedisConnection

  constructor() {
    this.#store = redis.connection('main')
  }

  has(key: string) {
    return this.#store.exists(key)
  }

  async get(key: string) {
    return await this.#store.get(key)
  }

  async set(key: string, value: any) {
    await this.#store.hset(key, value)
  }

  delete(key: string) {
    this.#store.del(key)
  }
}

const cash = new CacheService()

export default cash
