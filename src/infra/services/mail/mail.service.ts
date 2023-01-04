import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

import { EnvironmentService } from '@infra/config';
import { IMailOptions } from '@domain/types';
import { IMailService } from '@interfaces/index';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly environmentConfig: EnvironmentService) {}
  async sendMail(options: IMailOptions): Promise<void> {
    await this.createTransporter(options);
  }

  private async createTransporter(mailOptions: IMailOptions): Promise<void> {
    const settingsEmailProduction = {
      service: this.environmentConfig.getEmailService(),
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
      if (error) {
        console.log(error);
      } else {
        console.log('URL: ' + nodemailer.getTestMessageUrl(info));
      }
    });
  }
}
