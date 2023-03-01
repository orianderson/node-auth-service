import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

import { EnvironmentService } from '@infra/config';
import { IMailOptions, IMailService } from '@app/ports';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly environment: EnvironmentService) {}
  async sendMail(options: IMailOptions): Promise<void> {
    await this.createTransporter(options);
  }

  private async createTransporter(mailOptions: IMailOptions): Promise<void> {
    const settingsEmailProduction = {
      service: this.environment.getEmailService(),
      host: this.environment.getEmailServer(),
      port: 465,
      secure: true,
      auth: {
        user: this.environment.getEmailUser(),
        pass: this.environment.getEmailPassword(),
      },
    };

    const transporter = nodemailer.createTransport(settingsEmailProduction);

    transporter.sendMail(
      {
        ...mailOptions,
        from: this.environment.getEmailUser(),
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('URL: ' + nodemailer.getTestMessageUrl(info));
        }
      },
    );
  }
}
