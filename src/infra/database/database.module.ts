import { Module } from '@nestjs/common';

import { IEngineerRepository } from '../../app/repositories';

import { PrismaService } from './prisma/prisma.service';
import { EngineerRepository } from './repositories';

import { SecurityModule } from '@infra/common/security';

@Module({
  imports: [SecurityModule],
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
