import { Injectable } from '@nestjs/common';

import { EngineerInterface } from '../../../domain/types';
import { IEngineerRepository } from '../../../app/repositories';
import { EngineerMapper } from './mappers';
import { EngineerDatabaseService } from '@infra/database/services';

@Injectable()
export class EngineerRepository implements Partial<IEngineerRepository> {
  constructor(private readonly databaseService: EngineerDatabaseService) {}

  async verifyIfUserExist(email: string): Promise<{ email: string } | null> {
    const user = await this.databaseService.getOne('email', email, {
      email: true,
    });

    return user;
  }

  async create(body: EngineerInterface): Promise<void> {
    const newUser = new EngineerMapper().create(body);

    await this.databaseService.create({
      data: newUser,
    });
  }

  async signUser(email: string): Promise<EngineerInterface> {
    const user = await this.databaseService.getOne('email', email, null);

    return user;
  }

  async update(query: {
    field: 'email' | 'id';
    id: string | number;
    data: { data: Partial<EngineerInterface> };
  }): Promise<void> {
    await this.databaseService.update(query);
  }
}
