import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './repositories';
import { UsersRepository } from '../../app/repositories';

@Module({
  providers: [
    PrismaService,
    PrismaUsersRepository,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository, PrismaUsersRepository],
})
export class DatabaseModule {}
