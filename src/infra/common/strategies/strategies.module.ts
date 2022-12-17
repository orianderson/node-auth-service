import { Module } from '@nestjs/common';

import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { LoggerModule } from '@infra/logger';
import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { SecurityModule } from '@infra/common/security';

import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    LoggerModule,
    ExceptionsModule,
    SecurityModule,
  ],
  providers: [LocalStrategy],
  exports: [],
})
export class StrategiesModule {}
