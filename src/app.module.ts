import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/adapters/database';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
