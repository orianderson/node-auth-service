import { Module, MiddlewareConsumer } from '@nestjs/common';

import {
  ControllersModule,
  AdaptersProxyModule,
  LoggerModule,
  SetHeadersMiddleware,
} from './infra';

@Module({
  imports: [ControllersModule, AdaptersProxyModule, LoggerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeadersMiddleware).forRoutes('');
  }
}
