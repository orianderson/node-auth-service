import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUser } from '../../../app/use-cases';
import { UserProps } from '../../../app/types/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: RegisterUser) {}

  @Post()
  async create(@Body() body: UserProps) {
    const user = await this.usersRepository.execute(body);

    return {
      ...user,
    };
  }
}
