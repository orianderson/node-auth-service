import { JwtService } from 'bcrypt-jwt-module';

import { Unauthorized } from './../../../../helpers/exceptions';
import { EnvironmentService } from './../../../config/environments';
import { UserId } from '@app/ports/interfaces';

export class SecurityFactory {
  checkJwtToken(token: string): UserId {
    const jwt = new JwtService();
    const environment = new EnvironmentService();
    const payload = jwt.checkToken(token, environment.getJwtSecret());

    if (payload.isLeft()) {
      throw new Unauthorized(payload.value.message);
    }

    return {
      id: payload.value.id,
    };
  }
}

export const createSecurity = new SecurityFactory();
