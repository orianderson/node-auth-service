import { Injectable } from '@nestjs/common';

import { ManagerCache } from '@infra/database/cache/redis.client';
import { ICacheService, Value } from '@app/ports';

@Injectable()
export class CacheService implements ICacheService {
  constructor(private readonly client: ManagerCache) {}
  async setKey(key: string, value: Value): Promise<void> {
    await this.client.setKey(key, JSON.stringify(value));
  }

  async getKey(key: string): Promise<Value> {
    const value = await this.client.getKey(key);

    return JSON.parse(value);
  }

  async isKey(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(key: string): Promise<void> {
    await this.client.delete(key);
  }
}
