import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfig } from '@app/config';

@Injectable()
export class DatabaseConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}
  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
