import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { DatabaseUsersRepository } from './repositories';
import { UsersRepository } from '../../app/repositories';

import { SecurityModule } from '@infra/services';

@Module({
  imports: [SecurityModule],
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
