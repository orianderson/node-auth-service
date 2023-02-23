import { randomUUID } from 'crypto';

import { Email, Name, Password } from '../objects';
import { UserInput } from '../interfaces';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from '../errors';
import { Either, left, right } from '../../helpers';

export class User {
  public readonly user: {
    id: string;
    username: string;
    email: Email;
    name: Name;
    password: Password;
  };

  private constructor(
    id: string,
    email: Email,
    name: Name,
    password: Password,
    username: string,
  ) {
    this.user = {
      id: id ?? User.generateId(),
      email: email,
      name: name,
      username: username,
      password: password,
    };
  }

  static create(
    newUser: UserInput,
  ): Either<InvalidEmailError | InvalidNameError | InvalidPasswordError, User> {
    const email = Email.create(newUser.email);

    if (email.isLeft()) {
      return left(new InvalidEmailError(newUser.email));
    }

    const name = Name.create(newUser.name);

    if (name.isLeft()) {
      return left(new InvalidNameError(newUser.name));
    }

    const password = Password.create(newUser.password);

    if (password.isLeft()) {
      return left(new InvalidPasswordError());
    }

    return right(
      new User(
        newUser.id,
        email.value as Email,
        name.value as Name,
        password.value as Password,
        newUser.username,
      ),
    );
  }

  private static generateId() {
    return randomUUID();
  }
}
