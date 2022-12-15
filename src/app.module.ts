import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database';
import { HttpModule } from './infra/http';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
