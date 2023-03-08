import { JwtService } from 'bcrypt-jwt-module';

import { CacheService } from './../../database/cache.service';
import { ManagerCache } from '@infra/database/cache/redis.client';
import { EnvironmentService } from './../../../config/environments';

import { Unauthorized } from './../../../../helpers/exceptions';
import { UserId, blockList } from '@app/ports';

export class SecurityFactory {
  async checkJwtToken(token: string): Promise<UserId> {
    const jwt = new JwtService();
    const cacheService = new CacheService(new ManagerCache());
    const environment = new EnvironmentService();
    const payload = jwt.checkToken(token, environment.getJwtSecret());

    if (payload.isLeft()) {
      throw new Unauthorized(payload.value.message);
    }

    const isBlocked = await cacheService.isKey(blockList(payload.value.id));

    if (isBlocked) {
      throw new Unauthorized('User is blocked');
    }

    return {
      id: payload.value.id,
    };
  }
}

export const createSecurity = new SecurityFactory();
