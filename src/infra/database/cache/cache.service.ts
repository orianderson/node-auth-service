import { Injectable } from '@nestjs/common';

import { IAuthorizationManager, Value } from '@interfaces/cache';
import { ManagerCache } from './client';

@Injectable()
export class CacheService implements IAuthorizationManager {
  constructor(private readonly managerCache: ManagerCache) {}

  async setKey(key: string, value: Value): Promise<void> {
    await this.managerCache.setKey(key, JSON.stringify(value));
  }
  async getKey(key: string): Promise<unknown> {
    return await this.managerCache.getKey(key);
  }
  async isKey(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(query: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
