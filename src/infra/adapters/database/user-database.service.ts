import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { IDatabaseService } from '@app/ports/services';
import { DatabaseClient } from '@infra/database';

import { NewUser, UserData, UserUpdate } from '@domain/interfaces';
import { Prisma } from '@prisma/client';

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

  async create(newUser: NewUser): Promise<void> {
    await this.databaseClient.user.create({
      data: {
        ...newUser,
        id: newUser?.id ?? randomUUID(),
      },
    });
  }

  async get(query: {
    email: string;
    id?: string;
    data: Prisma.UserSelect;
  }): Promise<UserData | null> {
    const data = query.data;
    const user = await this.databaseClient.user.findFirst({
      where: {
        OR: [{ email: query?.email }, { id: query?.id }],
      },
      select: data,
    });

    if (user) {
      return user;
    } else return null;
  }

  async delete(id: string): Promise<void> {
    await this.databaseClient.user.delete({
      where: {
        id: id,
      },
    });
  }

  async update(query: UserUpdate): Promise<void> {
    await this.databaseClient.user.update({
      where: {
        id: query?.id,
        email: query?.email,
        username: query?.username,
      },
      data: {
        ...query.data,
        update_at: new Date(),
      },
    });
  }
}
