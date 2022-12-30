import { Module } from '@nestjs/common';

import { AdaptersProxyModule } from '@infra/adapters-proxy';
import { RegisterUserController } from './register-user';
import { AuthenticationController } from './auth';
import { SecurityModule } from '../security';

@Module({
  imports: [AdaptersProxyModule.register(), SecurityModule],
  controllers: [RegisterUserController, AuthenticationController],
  providers: [],
})
export class ControllersModule {}
