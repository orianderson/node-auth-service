import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserModel } from '@app/model';
import { UsersRepository } from '@app/repositories';
import { PrismaUsersMappers } from '@infra/database/prisma';

@Injectable()
export class DatabaseUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: UserModel): Promise<void> {
    const newUser = PrismaUsersMappers.registerMapper(data);
    await this.prismaService.users.create({
      data: newUser,
    });
  }
}
