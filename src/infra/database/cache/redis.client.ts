import { promisify } from 'util';
import * as redis from 'redis';

import { config } from '../../config';

export class ManagerCache {
  private client: redis;
  private setAsync: any;
  private existsAsync: any;
  private getAsync: any;
  private delAsync: any;

  constructor() {
    this.client = redis.createClient({
      host: config.getRedisHost(),
      port: 6379,
      no_ready_check: true,
      auth_pass: config.getRedisPassword(),
    });

    this.setAsync = promisify(this.client.set).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.existsAsync = promisify(this.client.exists).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  async setKey(key: string, value: string) {
    await this.setAsync(key, value);
  }

  async getKey(key: string) {
    return await this.getAsync(key);
  }

  async isKey(key: string) {
    const result = await this.existsAsync(key);
    return result === 1;
  }

  async delete(key: string) {
    await this.delAsync(key);
  }
}
