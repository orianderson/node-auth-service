import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [ConfigService, EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
