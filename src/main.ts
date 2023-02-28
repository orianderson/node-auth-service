import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionFilter } from './infra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3000);
}

bootstrap();
