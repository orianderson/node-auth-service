import { Module } from '@nestjs/common';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../../database';
import { SecurityModule } from '../../security';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtStrategy],
})
export class GuardModule {}
