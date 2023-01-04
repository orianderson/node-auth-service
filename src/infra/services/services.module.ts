import { Module } from '@nestjs/common';

import { MailService } from './mail';
import { EnvironmentModule } from '../config';

@Module({
  imports: [EnvironmentModule],
  providers: [MailService],
  exports: [MailService],
})
export class ServicesModule {}
