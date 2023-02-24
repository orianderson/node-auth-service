import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { IDatabaseService } from '@ports/database';
import { DatabaseClient } from '@infra/database';

import { UserInput } from '@domain/interfaces';

@Injectable()
export class UserDatabaseService implements IDatabaseService {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async exist(user: { email: string; username: string }): Promise<boolean> {
    const isUser = await this.databaseClient.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
      select: {
        id: true,
      },
    });

    if (!isUser) {
      return false;
    }

    return true;
  }

  async create(newUser: UserInput): Promise<void> {
    await this.databaseClient.user.create({
      data: {
        ...newUser,
        id: newUser?.id ?? randomUUID(),
      },
    });
  }

  async get(query: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.databaseClient.user.delete({
      where: {
        id: id,
      },
    });
  }

  async update(query: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
