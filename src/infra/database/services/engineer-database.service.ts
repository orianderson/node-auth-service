import { EngineerInterface } from '@domain/types';
import { Injectable } from '@nestjs/common';

import { DatabaseClient } from '../client/database.client';
import { IDataBaseService } from '@app/repositories';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class EngineerDatabaseService implements Partial<IDataBaseService> {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async create(query: Prisma.UsersCreateArgs): Promise<void> {
    await this.databaseClient.users.create(query);
  }

  async getOne(
    field: string,
    id: string | number,
    select: Prisma.UsersSelect | null,
  ): Promise<any> {
    const engineer = await this.databaseClient.users.findUnique({
      where: {
        [field]: id,
      },
      select: select,
    });

    return engineer;
  }

  async update(query: {
    field: 'email' | 'id';
    id: string | number;
    data: { data: Partial<EngineerInterface> };
  }): Promise<void> {
    await this.databaseClient.users.update({
      where: {
        [query.field]: query.id,
      },
      data: query.data,
    });
  }
}
