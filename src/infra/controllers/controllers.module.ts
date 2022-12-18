import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { SecurityModule } from '@infra/common/security';

import { AuthController } from './authentication.controller';
import { EngineerControllers } from './register-engineer.controller';

@Module({
  imports: [DatabaseModule, UsecasesProxyModule.register(), SecurityModule],
  controllers: [AuthController, EngineerControllers],
  providers: [],
})
export class ControllersModule {}
