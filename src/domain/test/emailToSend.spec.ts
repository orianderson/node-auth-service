import { EmailToSend } from './../entities/EmailToSend';
import { IMailOptions } from '@domain/types';

describe('Email to send', () => {
  it('must return mailOptions object', () => {
    const mailOptions: IMailOptions = {
      from: 'and.orissitem@gmail.com',
      to: 'and.orissitem@gmail.com',
      html: '<h1>olá</h1>',
      subject: 'Assunto',
    };

    const { options } = new EmailToSend(mailOptions);

    expect(options).toEqual(mailOptions);
  });

  it('should throw error', () => {
    const mailOptions: IMailOptions = {
      from: 'and.orissitem@gmail.com',
      to: '',
      subject: 'Assunto',
      html: '',
    };

    expect(() => new EmailToSend(mailOptions)).toThrowError();
  });
});
