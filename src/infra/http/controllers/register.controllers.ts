import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUser } from '../../../app/use-cases';
import { RegisterUserBody } from '../../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: RegisterUser) {}

  @Post()
  async create(@Body() body: RegisterUserBody) {
    const user = await this.usersRepository.execute(body);

    return {
      ...user,
    };
  }
}
