import { Module } from '@nestjs/common';

import { IEngineerRepository } from '../../app/repositories';

import { PrismaService } from './prisma.service';
import { EngineerRepository } from './repositories';

@Module({
  imports: [],
  providers: [
    PrismaService,
    EngineerRepository,
    {
      provide: IEngineerRepository,
      useClass: EngineerRepository,
    },
  ],
  exports: [IEngineerRepository, EngineerRepository],
})
export class DatabaseModule {}
