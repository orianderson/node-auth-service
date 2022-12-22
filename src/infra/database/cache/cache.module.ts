import { Module } from '@nestjs/common';

import { AllowListManager } from './allow-list.service';
import { ManagerCache } from './client';

@Module({
  imports: [],
  providers: [ManagerCache, AllowListManager],
  exports: [ManagerCache, AllowListManager],
})
export class ManagerCacheModule {}
