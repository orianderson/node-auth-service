import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { AdaptersModule } from '../adapters';
import { ControllersProxyModule } from '@infra/controllers-proxy';
import { RegisterEngineerControllers } from '../controllers/engineer';
import {
  AuthenticationControllers,
  VerifyUserController,
} from '../controllers/auth';

@Module({
  imports: [DatabaseModule, ControllersProxyModule.register(), AdaptersModule],
  controllers: [
    RegisterEngineerControllers,
    AuthenticationControllers,
    VerifyUserController,
  ],
  providers: [],
})
export class ControllersModule {}
