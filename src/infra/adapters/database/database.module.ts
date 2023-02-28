import { Module } from '@nestjs/common';

import { DatabaseClient } from '@infra/database';
import { UserDatabaseService } from './user-database.service';
import { ManagerCache } from './../../database/cache/redis.client';
import { CacheService } from './cache.service';

@Module({
  providers: [DatabaseClient, UserDatabaseService, CacheService, ManagerCache],
  exports: [UserDatabaseService, CacheService],
})
export class DatabaseModule {}
