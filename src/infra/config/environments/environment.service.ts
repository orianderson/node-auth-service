import * as dotenv from 'dotenv';
dotenv.config();

import {
  IDatabaseEnvironment,
  IJwtEnvironment,
  IMailEnvironment,
  IRedisEnvironment,
  IDevMailEnvironment,
} from '@app/ports';

export class EnvironmentService
  implements
    IDatabaseEnvironment,
    IJwtEnvironment,
    IMailEnvironment,
    IRedisEnvironment,
    IDevMailEnvironment
{
  getRedisPassword(): string {
    return process.env['REDIS_PASSWORD'];
  }

  getRedisHost(): string {
    return process.env['REDIS_HOST'];
  }

  getDevEmailPassword(): string {
    return process.env['DEV_EMAIL_PASSWORD'];
  }

  getDevEmailServer(): string {
    return process.env['DEV_EMAIL_SERVER'];
  }

  getDevEmailUser(): string {
    return process.env['DEV_EMAIL_USER'];
  }

  getEnvironment(): string {
    return process.env['NODE_ENV'];
  }

  getEmailUser(): string {
    return process.env['EMAIL_USER'];
  }

  getEmailPassword(): string {
    return process.env['EMAIL_PASSWORD'];
  }

  getEmailServer(): string {
    return process.env['EMAIL_SERVER'];
  }

  getEmailService(): string {
    return process.env['EMAIL_SERVICE'];
  }

  getJwtSecret(): string {
    return process.env['JWT_SECRET'];
  }

  getJwtExpirationTime(): string {
    return process.env['JWT_EXPIRATION_TIME'];
  }

  getJwtRefreshSecret(): string {
    return process.env['JWT_REFRESH_TOKEN_SECRET'];
  }

  getJwtRefreshExpirationTime(): string {
    return process.env['JWT_REFRESH_TOKEN_EXPIRATION_TIME'];
  }

  getDatabaseUrl(): string {
    return process.env['DATABASE_URL'];
  }
}

export const config = new EnvironmentService();
