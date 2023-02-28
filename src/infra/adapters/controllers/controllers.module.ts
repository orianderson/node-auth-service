import { UsecasesFactory } from './../factory/UsecasesFactory';
import { Module } from '@nestjs/common';

import { UserControllers } from './user';
import { AuthControllers } from './auth';

@Module({
  providers: [UsecasesFactory],
  controllers: [UserControllers, AuthControllers],
})
export class ControllersModule {}
