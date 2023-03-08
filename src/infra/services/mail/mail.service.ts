import { Injectable } from '@nestjs/common';

import { IMailOptions, IMailService } from '@app/ports';
import { MailTransporter } from './options';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly transporter: MailTransporter) {}
  async sendMail(options: IMailOptions): Promise<void> {
    await this.createTransporter(options);
  }

  private async createTransporter(mailOptions: IMailOptions): Promise<void> {
    this.transporter.sendEmail(mailOptions);
  }
}
