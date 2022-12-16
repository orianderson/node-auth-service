import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database';
import { ControllersModule } from '@infra/controllers';
import { EnvironmentConfigModule } from '@infra/config';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { SecurityModule } from './infra/services';

@Module({
  imports: [
    ControllersModule,
    DatabaseModule,
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule,
    SecurityModule,
  ],
})
export class AppModule {}
