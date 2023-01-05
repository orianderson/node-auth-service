import { Module } from '@nestjs/common';
// import * as redis from 'cache-manager-redis-store';

import { UserDatabaseService } from './user-database.service';
import { DatabaseClient } from './client';
import { UserRepository } from './repositories';
import { CacheService, ManagerCache } from './cache';

@Module({
  imports: [
    // CacheModule.register({
    //   store: redis,
    //   socket: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    //   isGlobal: true,
    // }),
  ],
  providers: [
    DatabaseClient,
    UserDatabaseService,
    UserRepository,
    CacheService,
    ManagerCache,
  ],
  exports: [UserDatabaseService, UserRepository, CacheService, ManagerCache],
})
export class DatabaseModule {}
