import { Module } from '@nestjs/common';

import { AdaptersProxyModule } from '@infra/adapters-proxy';
import { RegisterUserController } from './register-user';
import { AuthenticationController } from './auth';

@Module({
  imports: [AdaptersProxyModule.register()],
  controllers: [RegisterUserController, AuthenticationController],
  providers: [],
})
export class ControllersModule {}
