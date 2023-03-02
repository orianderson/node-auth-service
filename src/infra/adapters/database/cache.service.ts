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
    const isData = await this.client.isKey(key);

    if (!isData) {
      return false;
    }

    return true;
  }

  async delete(key: string): Promise<void> {
    await this.client.delete(key);
  }
}
