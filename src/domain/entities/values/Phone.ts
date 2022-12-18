import { BadRequest } from '../../exceptions';

export class Phone {
  private phone: string;

  constructor(phone: string) {
    this.validate(phone);
  }

  get phoneNumber(): string {
    return this.phone;
  }

  private validate(phone: string) {
    const str = phone.replace(/ /g, '');

    if (str.length >= 11) {
      const cleaned = ('' + str).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

      if (match) {
        this.phone = match[1] + ' ' + match[2] + match[3] + '-' + match[4];
      } else {
        throw new BadRequest({
          message: 'Número de telefone inválido',
          code_error: null,
        });
      }
    } else {
      throw new BadRequest({
        message: 'Número de telefone inválido',
        code_error: null,
      });
    }
  }
}
