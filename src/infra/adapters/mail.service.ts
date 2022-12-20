import { Injectable } from '@nestjs/common';

import { IMailOptions, IMailService } from '@app/adapters';

@Injectable()
export class MailService implements IMailService {
  async sendEmail(options: IMailOptions): Promise<void> {
    console.log(options);
  }
}
