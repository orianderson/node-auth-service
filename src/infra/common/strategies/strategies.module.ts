import { Module } from '@nestjs/common';

import { ControllersProxyModule } from '@infra/controllers-proxy';
import { LoggerModule } from '@infra/logger';
import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { AdaptersModule } from '../../adapters';

import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ControllersProxyModule.register(),
    LoggerModule,
    ExceptionsModule,
    AdaptersModule,
  ],
  providers: [LocalStrategy],
  exports: [],
})
export class StrategiesModule {}
