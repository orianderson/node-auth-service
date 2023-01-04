import { Injectable } from '@nestjs/common';

import { ICacheService, Value } from '@interfaces/cache';
import { ManagerCache } from './client';

@Injectable()
export class CacheService implements ICacheService {
  constructor(private readonly managerCache: ManagerCache) {}

  async setKey(key: string, value: Value): Promise<void> {
    await this.managerCache.setKey(key, JSON.stringify(value));
  }
  async getKey(key: string): Promise<Value> {
    const value = await this.managerCache.getKey(key);
    return JSON.parse(value);
  }
  async isKey(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(query: any): Promise<any> {
    await this.managerCache.delete(query);
  }
}
