import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfigService } from './database-config.service';

@Module({
  providers: [ConfigService, DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class EnvironmentConfigModule {}
