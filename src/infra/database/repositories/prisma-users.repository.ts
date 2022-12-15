import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { User } from '@app/entities';
import { UsersRepository } from '@app/repositories';
import { PrismaUsersMappers } from '@infra/database/prisma';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: User): Promise<void> {
    const newUser = PrismaUsersMappers.registerMapper(data);
    await this.prismaService.users.create({
      data: newUser,
    });
  }
}
