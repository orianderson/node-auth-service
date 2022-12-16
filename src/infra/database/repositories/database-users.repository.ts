import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserModel } from '@app/model';
import { UsersRepository } from '@app/repositories';
import { PrismaUsersMappers } from '@infra/database/prisma';

import { ConflictExceptionInterface } from '@app/exceptions';

@Injectable()
export class DatabaseUsersRepository implements UsersRepository {
  constructor(private readonly databaseService: PrismaService) {}

  async verifyIfUserExist(email: string): Promise<void> {
    const user = await this.databaseService.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictExceptionInterface({
        message: 'User already exist.',
        code_error: null,
      });
    }
  }

  async create(data: UserModel): Promise<void> {
    const newUser = PrismaUsersMappers.registerMapper(data);

    await this.verifyIfUserExist(data.email);

    await this.databaseService.users.create({
      data: newUser,
    });
  }

  async signUser(email: string): Promise<UserModel> {
    const user = await this.databaseService.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
