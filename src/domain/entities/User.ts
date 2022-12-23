import { UserEntity } from './base';

import { UserInterface, UserEntityInterface } from '@domain/types';
import { Replace } from '../../helpers';
import { fieldsToVerifyUser } from '../constants';
import { Email } from '..';

export class User extends UserEntity<UserInterface> {
  private baseUser: UserEntityInterface;

  constructor(user: Replace<UserInterface, { created_at?: Date }>) {
    super(user, fieldsToVerifyUser);

    this.baseUser = {
      ...user,
      email: new Email(user.email),
      created_at: user?.created_at ?? new Date(),
    };
  }

  public get user(): UserEntityInterface {
    return this.baseUser;
  }

  public toJsonObjectFormat(): UserInterface {
    return {
      ...this.baseUser,
      email: this.baseUser.email.value,
    };
  }
}
