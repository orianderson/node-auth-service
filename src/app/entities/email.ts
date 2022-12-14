export class Email {
  private readonly email: string;

  constructor(email: string) {
    this.validate(email);
    this.email = email;
  }

  get value(): string {
    return this.email;
  }

  private validate(email: string) {
    const regex = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
    const isValid = regex.test(email);

    if (!isValid) {
      throw new Error('Email não é válido');
    }
  }
}
