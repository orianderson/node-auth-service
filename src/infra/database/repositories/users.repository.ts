import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { IUsersRepository } from '@app/repositories';
import { UserInterface } from '@domain/types';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly databaseService: PrismaService) {}

  async signInUser(identity: string): Promise<UserInterface> {
    const user = await this.databaseService.users.findUnique({
      where: {
        email: identity,
      },
    });

    return user;
  }

  async verifyUserById(id: string): Promise<{ id: string }> {
    const user = await this.databaseService.users.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }
}
