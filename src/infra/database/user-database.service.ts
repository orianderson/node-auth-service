import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/prisma-client';

import { DatabaseClient } from './client/database.client';
import { IDataBaseService } from '@interfaces/repositories';

import { UserIdentity } from '@domain/types';

@Injectable()
export class UserDatabaseService implements IDataBaseService {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async isUser(identity: UserIdentity): Promise<any> {
    const user = await this.databaseClient.user.findFirst({
      where: {
        OR: [{ email: identity.email }, { username: identity.username }],
      },
      select: {
        id: true,
      },
    });

    return user;
  }

  async create(query: Prisma.UserCreateInput): Promise<any> {
    await this.databaseClient.user.create({
      data: query,
    });
  }

  async getOne(field: string, identity: any, query: any): Promise<any> {
    const user = await this.databaseClient.user.findUnique({
      where: {
        [field]: identity,
      },
      select: query,
    });

    return user;
  }

  async update(
    field: string,
    id: string,
    value: Prisma.UserUpdateInput,
  ): Promise<any> {
    await this.databaseClient.user.update({
      where: {
        [field]: id,
      },
      data: {
        ...value,
        update_at: new Date(),
      },
    });
  }

  async delete(field: string, identity: string): Promise<any> {
    await this.databaseClient.user.delete({
      where: {
        [field]: identity,
      },
    });
  }

  async getAll(query: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
