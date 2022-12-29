import { Module } from '@nestjs/common';

import { RegisterUserController } from './register-user';
import { AdaptersProxyModule } from '@infra/adapters-proxy';

@Module({
  imports: [AdaptersProxyModule.register()],
  controllers: [RegisterUserController],
  providers: [],
})
export class ControllersModule {}
