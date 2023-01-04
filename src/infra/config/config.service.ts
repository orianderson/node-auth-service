import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvironment } from '@app/config';

@Injectable()
export class EnvironmentService implements IEnvironment {
  constructor(private readonly configService: ConfigService) {}
  getEmailUser(): string {
    return this.configService.get<string>('EMAIL_USER');
  }

  getEmailPassword(): string {
    return this.configService.get<string>('EMAIL_PASSWORD');
  }

  getEmailServer(): string {
    return this.configService.get<string>('EMAIL_SERVER');
  }

  getEmailService(): string {
    return this.configService.get<string>('EMAIL_SERVICE');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
