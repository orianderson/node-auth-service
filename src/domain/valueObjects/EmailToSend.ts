import { BadRequestException } from '../../helpers/exceptions/BadRequest';
import { IMailOptions } from '@domain/types';

export class EmailToSend {
  private mailOptions: IMailOptions;
  constructor(mailOptions: IMailOptions) {
    this.validade(mailOptions);

    this.mailOptions = mailOptions;
  }

  get options() {
    return this.mailOptions;
  }

  private validade(mailOptions: IMailOptions) {
    const fields = ['to', 'subject', 'html'];

    fields.forEach((item) => {
      if (!mailOptions[item]) {
        throw new BadRequestException({
          code_error: null,
          message: 'Fields empty',
        });
      }
    });
  }
}
