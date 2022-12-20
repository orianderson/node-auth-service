import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

import { IMailOptions } from '@domain/types';
import { IMailService } from '@app/adapters';
import { EnvironmentConfigService } from '@infra/config';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly environmentConfig: EnvironmentConfigService) {}

  async sendEmail(options: IMailOptions): Promise<void> {
    await this.createTransporter(options);
  }

  private async createTransporter(mailOptions: IMailOptions): Promise<void> {
    const settingsEmailProduction = {
      host: this.environmentConfig.getEmailServer(),
      port: 465,
      secure: true,
      auth: {
        user: this.environmentConfig.getEmailUser(),
        pass: this.environmentConfig.getEmailPassword(),
      },
    };

    const transporter = nodemailer.createTransport(settingsEmailProduction);

    transporter.sendMail(mailOptions, (error, info) => {
      try {
        console.log('first');
      } catch (e) {}
      // if (error) {
      console.log('URL: ' + nodemailer.getTestMessageUrl(info));
      //   console.log('error');
      // } else {
      //   console.log('URL: ' + nodemailer.getTestMessageUrl(info));
      // }
    });
  }
}
