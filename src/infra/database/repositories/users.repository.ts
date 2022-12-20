import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '@app/repositories';
import { UserInterface } from '@domain/types';
import { UserDatabaseService } from '../services';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly databaseService: UserDatabaseService) {}

  async signInUser(identity: string): Promise<UserInterface> {
    const user = await this.databaseService.getOne('email', identity, null);

    return user;
  }

  async verifyUserById(id: string): Promise<{ id: string }> {
    const user = await this.databaseService.getOne('id', id, {
      id: true,
    });

    return user;
  }
}
