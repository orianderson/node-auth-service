import { Module } from '@nestjs/common';
import { RegisterUser } from '../../app/use-cases';
import { DatabaseModule } from '../database';

import { UsersController } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [RegisterUser],
})
export class HttpModule {}
