import { Module } from '@nestjs/common';

import { UserDatabaseService } from './user-database.service';
import { DatabaseClient } from './client';
import { UserRepository } from './repositories';

@Module({
  providers: [DatabaseClient, UserDatabaseService, UserRepository],
  exports: [UserDatabaseService, UserRepository],
})
export class DatabaseModule {}
