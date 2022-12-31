import { GuardModule } from './infra/security/guard/guard.module';
import { Module, MiddlewareConsumer } from '@nestjs/common';

import {
  ControllersModule,
  AdaptersProxyModule,
  LoggerModule,
  SetHeadersMiddleware,
  SecurityModule,
  DatabaseModule,
} from './infra';
import { EnvironmentModule } from './infra/config';

@Module({
  imports: [
    ControllersModule,
    DatabaseModule,
    LoggerModule,
    SecurityModule,
    EnvironmentModule,
    AdaptersProxyModule,
    GuardModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeadersMiddleware).forRoutes('');
  }
}
