import { Module } from '@nestjs/common';

import { ControllersModule, AdaptersProxyModule, LoggerModule } from './infra';

@Module({
  imports: [ControllersModule, AdaptersProxyModule, LoggerModule],
})
export class AppModule {}
