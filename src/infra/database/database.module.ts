import { Module, CacheModule } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import * as redis from 'cache-manager-redis-store';

import { ICacheService } from '@app/cache';

import { IUsersRepository, IEngineerRepository } from '../../app/repositories';

import { DatabaseClient } from './client/database.client';
import { EngineerDatabaseService, UserDatabaseService } from './services';
import { UsersRepository, EngineerRepository } from './repositories';

import { CacheService } from './cache';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redis,
      // host: 'localhost',
      // port: 6369,
      url: 'redis://localhost:6379',
      isGlobal: true,
    }),
  ],
  providers: [
    DatabaseClient,
    EngineerDatabaseService,
    UserDatabaseService,
    UsersRepository,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    EngineerRepository,
    {
      provide: IEngineerRepository,
      useClass: EngineerRepository,
    },
    CacheService,
    {
      provide: ICacheService,
      useClass: CacheService,
    },
  ],
  exports: [
    EngineerDatabaseService,
    UserDatabaseService,
    IEngineerRepository,
    EngineerRepository,
    IUsersRepository,
    UsersRepository,
    CacheService,
  ],
})
export class DatabaseModule {}
