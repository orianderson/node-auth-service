import { Module } from '@nestjs/common';

import { IUsersRepository, IEngineerRepository } from '../../app/repositories';

import { DatabaseClient } from './client/database.client';
import { EngineerDatabaseService, UserDatabaseService } from './services';
import { UsersRepository, EngineerRepository } from './repositories';

@Module({
  imports: [],
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
  ],
  exports: [
    EngineerDatabaseService,
    UserDatabaseService,
    IEngineerRepository,
    EngineerRepository,
    IUsersRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
