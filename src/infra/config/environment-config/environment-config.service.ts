import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfig } from '@app/interfaces';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private configService: ConfigService) {}
  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
