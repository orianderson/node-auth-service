import { Module, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule } from '@infra/database';
import { ControllersModule } from '@infra/controllers';
import { EnvironmentConfigModule } from '@infra/config';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { StrategiesModule } from './infra/common/strategies/strategies.module';
import { AdaptersModule } from './infra/adapters';

import { SetHeadersMiddleware } from './infra/common/middleware';

@Module({
  imports: [
    ControllersModule,
    DatabaseModule,
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule,
    AdaptersModule,
    StrategiesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeadersMiddleware).forRoutes('');
  }
}
