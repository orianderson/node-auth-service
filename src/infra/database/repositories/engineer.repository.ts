import { Injectable } from '@nestjs/common';

import { EngineerInterface } from '../../../domain/types';
import { IEngineerRepository } from '../../../app/repositories';
import { EngineerMapper } from './mappers';
import { PrismaService } from './../prisma.service';

import { ConflictException } from '../../exceptions/handle';

@Injectable()
export class EngineerRepository implements IEngineerRepository {
  constructor(private readonly databaseService: PrismaService) {}

  async verifyIfUserExist(email: string): Promise<void> {
    const user = await this.databaseService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictException({
        message: 'User already exist.',
        code_error: null,
      });
    }
  }

  async create(body: EngineerInterface): Promise<void> {
    const newUser = new EngineerMapper().create(body);

    await this.verifyIfUserExist(newUser.email);

    await this.databaseService.users.create({
      data: newUser,
    });
  }

  async signUser(email: string): Promise<EngineerInterface> {
    const user = await this.databaseService.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
