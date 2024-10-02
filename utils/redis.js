/* eslint-disable */
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.createRedis();
  }

  async createRedis() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis Client Error:', err));

    try {
      await this.client.connect();
    } catch (err) {
      console.error('Error connecting to Redis:', err);
    }
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (err) {
      console.error(`Error setting key ${key}: ${err.message}`);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
      console.log(`Key ${key} deleted successfully`);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
