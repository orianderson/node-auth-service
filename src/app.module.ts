import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/adapters/database';
import { ControllersModule } from '@infra/adapters/controllers/controllers.module';
import { LoggerModule } from '@infra/config';

@Module({
  imports: [DatabaseModule, ControllersModule, LoggerModule],
})
export class AppModule {}
