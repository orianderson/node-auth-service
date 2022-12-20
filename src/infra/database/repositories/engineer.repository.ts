import { Injectable } from '@nestjs/common';

import { EngineerInterface } from '../../../domain/types';
import { IEngineerRepository } from '../../../app/repositories';
import { EngineerMapper } from './mappers';
import { EngineerDatabaseService } from '@infra/database/services';

@Injectable()
export class EngineerRepository implements IEngineerRepository {
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

  async verifyUserById(id: string): Promise<{ id: string } | null> {
    const user = await this.databaseService.getOne('id', id, {
      id: true,
    });

    return user;
  }
}
