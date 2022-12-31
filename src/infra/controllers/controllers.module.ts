import { Module } from '@nestjs/common';

import { AdaptersProxyModule } from '@infra/adapters-proxy';
import { RegisterUserController } from './register-user';
import { AuthenticationController } from './auth';

import { SecurityModule, GuardModule } from '../security';

@Module({
  imports: [SecurityModule, AdaptersProxyModule.register()],
  controllers: [RegisterUserController, AuthenticationController],
  providers: [],
})
export class ControllersModule {}
