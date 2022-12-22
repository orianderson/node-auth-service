import { IAuthorizationManager } from '@app/cache';
import { ManagerCache } from './client';
import { UnauthorizedException } from '@helpers/exceptions';

export class AllowListManager implements IAuthorizationManager {
  constructor(private readonly managerCache: ManagerCache) {}

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid Credentials',
    });
  }

  async setKey(key: string, value: string, expiration: number): Promise<void> {
    await this.managerCache.setKey(key, value, expiration);
  }
  async getKey(key: string): Promise<unknown> {
    const result = await this.managerCache.getKey(key);

    return result;
  }
  async isKey(key: string): Promise<boolean> {
    if (!key) {
      this.handleException();
    }

    return await this.managerCache.isKey(key);
  }

  async delete(key: string): Promise<void> {
    if (!key) {
      this.handleException();
    }

    await this.managerCache.delete(key);
  }
}
