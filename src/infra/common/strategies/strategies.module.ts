import { Module } from '@nestjs/common';

import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { LoggerModule } from '@infra/logger';
import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { AdaptersModule } from '../../adapters';

import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    LoggerModule,
    ExceptionsModule,
    AdaptersModule,
  ],
  providers: [LocalStrategy],
  exports: [],
})
export class StrategiesModule {}
