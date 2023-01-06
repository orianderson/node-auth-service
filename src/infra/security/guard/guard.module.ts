import { Module } from '@nestjs/common';

import { LocalStrategy } from './local.strategy';
import { DatabaseModule } from '../../database';
import { SecurityModule } from '../../security';
import { AuthorizationStrategy } from './authorization.strategy';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [LocalStrategy, AuthorizationStrategy],
  exports: [LocalStrategy, AuthorizationStrategy],
})
export class GuardModule {}
