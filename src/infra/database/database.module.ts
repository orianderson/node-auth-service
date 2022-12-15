import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { UsersRepository } from '../../app/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
