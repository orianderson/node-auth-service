import { Module } from '@nestjs/common';

import { DatabaseClient } from '@infra/database';
import { UserDatabaseService } from './user-database.service';

@Module({
  providers: [DatabaseClient, UserDatabaseService],
  exports: [UserDatabaseService],
})
export class DatabaseModule {}
