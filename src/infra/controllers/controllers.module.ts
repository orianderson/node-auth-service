import { Module } from '@nestjs/common';
import { RegisterUser } from '@app/usecases';
import { DatabaseModule } from '../database';
import { UsersController } from './register-user.controller';
import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { SecurityModule } from '@infra/services';

@Module({
  imports: [DatabaseModule, UsecasesProxyModule.register(), SecurityModule],
  controllers: [UsersController],
  providers: [RegisterUser],
})
export class ControllersModule {}
