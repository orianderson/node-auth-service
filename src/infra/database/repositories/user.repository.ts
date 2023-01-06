import { Replace } from '@helpers/Replace';
import { Injectable } from '@nestjs/common';

import { UserMappers } from './mappers/user.mappers';
import { ICredentials, UserInterface } from '@domain/types';
import { IUserRepository } from '@interfaces/index';
import { UserDatabaseService } from '../user-database.service';
import { UserIdentity } from '@domain/types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly userDatabaseService: UserDatabaseService) {}

  async verifyIfUserExist(query: UserIdentity): Promise<{ id: string }> {
    const user = await this.userDatabaseService.isUser(query);

    return user;
  }

  async create(payload: UserInterface): Promise<{ userId: string }> {
    const newUser = UserMappers.create(payload);

    await this.userDatabaseService.create(newUser);

    return {
      userId: newUser.id,
    };
  }

  async signInUser(
    payload: Replace<ICredentials, { field: string }>,
  ): Promise<UserInterface> {
    const user = await this.userDatabaseService.getOne(
      payload.field,
      payload.email,
      null,
    );

    return user;
  }

  async verifyUserByIdentity(
    field: string,
    id: any,
    query: any,
  ): Promise<{ id: string }> {
    const user = await this.userDatabaseService.getOne(field, id, query);

    return user;
  }

  async update(field: string, id: string, value: any): Promise<void> {
    await this.userDatabaseService.update(field, id, value);
  }
}
