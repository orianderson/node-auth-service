import { Module, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule } from '@infra/adapters/database';
import { ControllersModule } from '@infra/adapters/controllers/controllers.module';
import { LoggerModule } from '@infra/config';

import { SetHeadersMiddleware } from '@infra/adapters';

@Module({
  imports: [DatabaseModule, ControllersModule, LoggerModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeadersMiddleware).forRoutes('');
  }
}
