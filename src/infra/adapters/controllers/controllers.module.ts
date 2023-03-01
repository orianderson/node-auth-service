import { UserUsecasesFactory } from '../factory';
import { Module } from '@nestjs/common';

import { UserControllers } from './user';
import { AuthControllers } from './auth';

@Module({
  providers: [UserUsecasesFactory],
  controllers: [UserControllers, AuthControllers],
})
export class ControllersModule {}
