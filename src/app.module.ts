import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database';
import { HttpModule } from '@infra/http';
import { EnvironmentConfigModule } from '@infra/config';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { UsecasesProxyModule } from '@infra/usecases-proxy';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule,
  ],
})
export class AppModule {}
