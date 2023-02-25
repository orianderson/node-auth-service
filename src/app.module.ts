import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/adapters/database';
import { ControllersModule } from '@infra/adapters/controllers/controllers.module';

@Module({
  imports: [DatabaseModule, ControllersModule],
})
export class AppModule {}
