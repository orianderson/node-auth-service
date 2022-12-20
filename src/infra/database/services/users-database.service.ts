import { Injectable } from '@nestjs/common';

import { DatabaseClient } from '../client/database.client';
import { IDataBaseService } from '@app/repositories';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class UserDatabaseService implements Partial<IDataBaseService> {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async getOne(
    field: string,
    id: string | number,
    select: Prisma.UsersSelect | null,
  ): Promise<any> {
    const user = await this.databaseClient.users.findUnique({
      where: {
        [field]: id,
      },
      select: select,
    });

    return user;
  }
}
