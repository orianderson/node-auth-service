import { Module } from '@nestjs/common';

import { LocalStrategy } from './local.strategy';
import { AdaptersProxyModule } from '@infra/adapters-proxy';

@Module({
  imports: [AdaptersProxyModule.register()],
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export class GuardModule {}
