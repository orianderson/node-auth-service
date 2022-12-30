import { Module, MiddlewareConsumer } from '@nestjs/common';

import {
  ControllersModule,
  AdaptersProxyModule,
  LoggerModule,
  SetHeadersMiddleware,
  SecurityModule,
} from './infra';

@Module({
  imports: [
    ControllersModule,
    AdaptersProxyModule,
    LoggerModule,
    SecurityModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeadersMiddleware).forRoutes('');
  }
}
