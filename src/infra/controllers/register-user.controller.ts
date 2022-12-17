import { Body, Controller, Post, Inject, Res } from '@nestjs/common';
import { Response } from 'express';

import { UseCaseProxy } from '@infra/usecases-proxy';
import { RegisterUser } from '@app/usecases';
import { RegisterUserBody } from './dto';
import { UserViewModel } from './presenters';
import { StatusCodeResponse } from '@helpers/index';

import { UsecasesProxyModule } from '@infra/usecases-proxy';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USER_USECASES_PROXY)
    private readonly usersRepository: UseCaseProxy<RegisterUser>,
  ) {}

  @Post()
  async create(@Body() body: RegisterUserBody, @Res() res: Response) {
    const repository = this.usersRepository.getInstance();
    const user = await repository.execute(body);

    res
      .status(StatusCodeResponse.CREATED)
      .send(UserViewModel.toHttpResponse(user));
  }
}
