import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { AllExceptionFilter, LoggerService, EnvironmentService } from './infra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Authentication APi')
    .setDescription(
      'This Api can use by any system, like a microservice, to user authenticate with email and password. Also works to verify user by Jwt service.',
    )
    .addBasicAuth()
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(new EnvironmentService().getApiPort());
}

bootstrap();
