import { Either, left, right } from '../../helpers';

import { InvalidPasswordError } from '../errors';

export class Password {
  public readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (Password.validate(password)) {
      return right(new Password(password));
    }

    return left(new InvalidPasswordError());
  }

  private static validate(password: string): boolean {
    if (!password) {
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!passwordRegex.test(password)) {
      return false;
    }

    return true;
  }
}
