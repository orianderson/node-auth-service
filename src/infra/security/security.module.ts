import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './guard/local.strategy';
import { AdaptersProxyModule } from '@infra/adapters-proxy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AdaptersProxyModule.register(),
  ],
  providers: [LocalStrategy],
})
export class SecurityModule {}
