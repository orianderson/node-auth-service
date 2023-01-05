import { Module } from '@nestjs/common';

import { AdaptersProxyModule } from '@infra/adapters-proxy';
import { RegisterUserController } from './register-user';
import { AuthenticationController, LogoutController } from './auth';

import { SecurityModule } from '../security';
import { DatabaseModule } from '@infra/database';

@Module({
  imports: [SecurityModule, AdaptersProxyModule.register(), DatabaseModule],
  controllers: [
    RegisterUserController,
    AuthenticationController,
    LogoutController,
  ],
  providers: [],
})
export class ControllersModule {}
