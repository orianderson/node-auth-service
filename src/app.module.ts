import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';
import { AdaptersProxyModule } from './infra/adapters-proxy/adapters-proxy.module';

@Module({
  imports: [ControllersModule, AdaptersProxyModule],
})
export class AppModule {}
