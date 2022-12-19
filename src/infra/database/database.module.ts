import { Module } from '@nestjs/common';

import { IUsersRepository, IEngineerRepository } from '../../app/repositories';

import { PrismaService } from './prisma.service';
import { UsersRepository, EngineerRepository } from './repositories';

@Module({
  imports: [],
  providers: [
    PrismaService,
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
    IEngineerRepository,
    EngineerRepository,
    IUsersRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
