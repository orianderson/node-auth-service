import { UsecasesFactory } from './../factory/UsecasesFactory';
import { Module } from '@nestjs/common';

import { UserControllers } from './user';

@Module({
  providers: [UsecasesFactory],
  controllers: [UserControllers],
})
export class ControllersModule {}
