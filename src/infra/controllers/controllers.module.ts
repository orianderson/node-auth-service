import { Module } from '@nestjs/common';
import { RegisterUser } from '@app/usecases';
import { DatabaseModule } from '../database';
import { UsersController } from './register-user.controller';
import { UsecasesProxyModule } from '@infra/usecases-proxy';
import { SecurityModule } from '@infra/services';
import { AuthController } from './authentication.controller';

@Module({
  imports: [DatabaseModule, UsecasesProxyModule.register(), SecurityModule],
  controllers: [UsersController, AuthController],
  providers: [RegisterUser],
})
export class ControllersModule {}
