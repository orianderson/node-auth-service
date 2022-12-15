import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfig, JWTConfig } from '@app/config';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}
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
