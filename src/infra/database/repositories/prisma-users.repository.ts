import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { UserProps } from '../../../app/types';
import { UsersRepository } from '../../../app/repositories';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: UserProps): Promise<void> {
    await this.prismaService.users.create({
      data: {
        id: data.id,
        city: data.city,
        email: data.email,
        job: data.job,
        name: data.name,
        phone: data.phone,
        state: data.state,
        whatsapp: data.whatsapp,
        created_at: data.created_at,
      },
    });
  }
}
