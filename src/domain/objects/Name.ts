import { Either, left, right } from '../../helpers';

import { InvalidNameError } from '../errors';

export class Name {
  public readonly userName: string;

  private constructor(name: string) {
    this.userName = name;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name));
    }

    return left(new InvalidNameError(name));
  }

  static validate(name: string) {
    if (!name) {
      return false;
    }

    if (name.trim().length < 2) {
      return false;
    }

    if (name.trim().length > 256) {
      return false;
    }

    return true;
  }
}
