import { Module } from '@nestjs/common';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../../database';
import { SecurityModule } from '../../security';
import { AuthorizationStrategy } from './authorization.strategy';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [LocalStrategy, JwtStrategy, AuthorizationStrategy],
  exports: [LocalStrategy, JwtStrategy],
})
export class GuardModule {}
