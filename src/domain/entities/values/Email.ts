import { BadRequestInterface } from '../../exceptions';

export class Email {
  private readonly emailUser: string;

  constructor(email: string) {
    this.validate(email);
    this.emailUser = email;
  }

  get email(): string {
    return this.emailUser;
  }

  private validate(email: string) {
    const regex = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
    const isValid = regex.test(email);

    if (!isValid) {
      throw new BadRequestInterface({
        message: 'Email não é válido',
        code_error: null,
      });
    }
  }
}
