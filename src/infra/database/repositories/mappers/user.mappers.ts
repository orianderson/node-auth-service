import { randomUUID } from 'crypto';

import { Replace } from '@helpers/Replace';
import { UserInterface } from '@domain/types';

export class UserMappers {
  static create(user: Replace<UserInterface, { id?: string }>) {
    return {
      id: user?.id ?? randomUUID(),
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      password: user.password,
    };
  }
}
