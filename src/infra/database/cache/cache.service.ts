import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { ICacheService } from '@app/cache';

@Injectable()
export class CacheService implements ICacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async create(query: { key: string; value: string }): Promise<any> {
    await this.cacheManager.set(query.key, query.value);
  }
  async get(key: string): Promise<{ code: string | unknown }> {
    const value = await this.cacheManager.get(key);

    return {
      code: value,
    };
  }
  async delete(key: any): Promise<void> {
    await this.cacheManager.del(key);
  }
}
