import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { DatabaseUsersRepository } from './repositories';
import { UsersRepository } from '../../app/repositories';

@Module({
  providers: [
    PrismaService,
    DatabaseUsersRepository,
    {
      provide: UsersRepository,
      useClass: DatabaseUsersRepository,
    },
  ],
  exports: [UsersRepository, DatabaseUsersRepository],
})
export class DatabaseModule {}
