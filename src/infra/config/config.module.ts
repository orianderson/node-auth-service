import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvironmentService } from './config.service';
import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [ConfigService, EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
