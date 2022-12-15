import { Module } from '@nestjs/common';
import { RegisterUser } from '@app/usecases';
import { DatabaseModule } from '../database';

import { UsersController } from './controllers';
import { UsecasesProxyModule } from '@infra/usecases-proxy';

@Module({
  imports: [DatabaseModule, UsecasesProxyModule.register()],
  controllers: [UsersController],
  providers: [RegisterUser],
})
export class HttpModule {}
