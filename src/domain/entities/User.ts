import { UserInterface } from '@domain/types';
import { Replace } from '../../helpers';
import { fieldsToVerifyUser } from '../constants';

import { UserEntity } from './base';

export class User extends UserEntity<UserInterface> {
  private baseUser: UserInterface;

  constructor(user: Replace<UserInterface, { created_at?: Date }>) {
    super(user, fieldsToVerifyUser);

    this.baseUser = {
      ...user,
      created_at: user.created_at ?? new Date(),
    };
  }

  public get user(): UserInterface {
    return this.baseUser;
  }
}
