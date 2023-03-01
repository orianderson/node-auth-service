import * as nodemailer from 'nodemailer';

import { IMailOptions } from '@app/ports';
import { EnvironmentService } from './../../config/environments';

export class MailTransporter {
  private environment: EnvironmentService;

  constructor() {
    this.environment = new EnvironmentService();
  }

  sendEmail(options: IMailOptions) {
    if (this.environment.getEnvironment() === 'development') {
      this.development(options);

      return;
    }

    this.production(options);
  }

  private development(options: IMailOptions) {
    return nodemailer
      .createTransport({
        host: this.environment.getDevEmailServer(),
        port: 587,
        auth: {
          user: this.environment.getDevEmailUser(),
          pass: this.environment.getDevEmailPassword(),
        },
      })
      .sendMail(
        {
          ...options,
          from: this.environment.getDevEmailUser(),
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

  private production(options: IMailOptions) {
    return nodemailer
      .createTransport({
        service: this.environment.getEmailService(),
        host: this.environment.getEmailServer(),
        port: 465,
        secure: true,
        auth: {
          user: this.environment.getEmailUser(),
          pass: this.environment.getEmailPassword(),
        },
      })
      .sendMail({
        ...options,
        from: this.environment.getEmailUser(),
      });
  }
}
