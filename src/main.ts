import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionFilter, LoggerService } from './infra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  await app.listen(3000);
}

bootstrap();
