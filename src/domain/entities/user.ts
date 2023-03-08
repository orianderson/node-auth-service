import { randomUUID } from 'crypto';

import { Email, Name, Password } from '../objects';
import { InputCreateUser } from '../interfaces';
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidPasswordError,
} from '../errors';
import { Either, left, right, verifyFields } from '../../helpers';

interface UserProps {
  id: string;
  username: string;
  email: Email;
  name: Name;
  profile: string;
  user_terms: boolean;
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
      username: user.username,
      profile: user.profile,
      use_privacy: user.use_privacy,
      user_terms: user.user_terms,
      password: user.password,
    };
  }

  static create(
    newUser: InputCreateUser,
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

    this.verifyFields(newUser);

    return right(
      new User({
        id: newUser.id,
        email: email.value as Email,
        name: name.value as Name,
        password: password.value as Password,
        username: newUser.username,
        profile: newUser.profile,
        use_privacy: newUser.use_privacy,
        user_terms: newUser.user_terms,
      }),
    );
  }

  static toJsonFormat(userObj: User): InputCreateUser {
    return {
      email: userObj.user.email.email,
      name: userObj.user.name.userName,
      password: userObj.user.password.password,
      profile: userObj.user.profile,
      username: userObj.user.username,
      id: userObj.user.id,
      use_privacy: userObj.user.use_privacy,
      user_terms: userObj.user.user_terms,
    };
  }

  private static generateId() {
    return randomUUID();
  }

  private static verifyFields(data: InputCreateUser) {
    verifyFields(data, ['profile', 'username', 'userTerms', 'usePrivacy']);
  }
}
