import { UserInterface } from './../types';
import { Replace } from '../../helpers';
import { fieldsToVerifyUser } from './constants';
import { Email } from './values/Email';

import { UserEntity } from './UserEntity';

export class User extends UserEntity<UserInterface> {
  private baseUser: UserInterface;

  constructor(user: Replace<UserInterface, { created_at?: Date }>) {
    super(user, fieldsToVerifyUser);

    new Email(user.email);

    this.baseUser = {
      ...user,
      created_at: user.created_at ?? new Date(),
    };
  }

  public get user(): UserInterface {
    return this.baseUser;
  }
}
