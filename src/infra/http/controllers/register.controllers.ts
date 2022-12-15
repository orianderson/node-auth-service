import { UseCaseProxy } from './../../usecases-proxy/usecases-proxy';
import { Body, Controller, Post, Inject } from '@nestjs/common';
import { RegisterUser } from '@app/usecases';
import { RegisterUserBody } from '../../dto';
import { UserViewModel } from '@infra/http';

import { UsecasesProxyModule } from '@infra/usecases-proxy';
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USER_USECASES_PROXY)
    private readonly usersRepository: UseCaseProxy<RegisterUser>,
  ) {}

  @Post()
  async create(@Body() body: RegisterUserBody) {
    const user = await this.usersRepository.getInstance().execute(body);

    return UserViewModel.toHttpResponse(user);
  }
}
