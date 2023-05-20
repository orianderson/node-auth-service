import { randomUUID } from 'crypto';

import { Email, Name, Password } from '../objects';
import { NewUser } from '../interfaces';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
  InvalidFieldError,
} from '../errors';
import { Either, left, right, verifyFields } from '../../helpers';

interface UserProps {
  id: string;
  email: Email;
  name: Name;
  profile: string;
  use_terms: boolean;
  use_privacy: boolean;
  password: Password;
}

export class User {
  public readonly user: UserProps;

  private constructor(user: UserProps) {
    this.user = {
      id: user.id ?? User.generateId(),
      email: user.email,
      name: user.name,
      profile: user.profile,
      use_privacy: user.use_privacy,
      use_terms: user.use_terms,
      password: user.password,
    };
  }

  static create(
    newUser: NewUser,
  ): Either<
    | InvalidEmailError
    | InvalidNameError
    | InvalidPasswordError
    | InvalidFieldError,
    User
  > {
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

    const { field, check } = this.verifyFields(newUser);

    if (!check) {
      return left(new InvalidFieldError(field));
    }

    return right(
      new User({
        id: newUser.id,
        email: email.value as Email,
        name: name.value as Name,
        password: password.value as Password,
        profile: newUser.profile,
        use_privacy: newUser.use_privacy,
        use_terms: newUser.use_terms,
      }),
    );
  }

  static toJsonFormat(userObj: User): NewUser {
    return {
      email: userObj.user.email.email,
      name: userObj.user.name.userName,
      password: userObj.user.password.password,
      profile: userObj.user.profile,
      id: userObj.user.id,
      use_privacy: userObj.user.use_privacy,
      use_terms: userObj.user.use_terms,
    };
  }

  private static generateId() {
    return randomUUID();
  }

  private static verifyFields(data: NewUser) {
    return verifyFields(data, ['profile', 'use_terms', 'use_privacy']);
  }
}
