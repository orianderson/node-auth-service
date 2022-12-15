import { Body, Controller, Post, Inject } from '@nestjs/common';

import { UseCaseProxy } from '@infra/usecases-proxy';
import { RegisterUser } from '@app/usecases';
import { RegisterUserBody } from './dto';
import { UserViewModel } from './presenters';

import { UsecasesProxyModule } from '@infra/usecases-proxy';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USER_USECASES_PROXY)
    private readonly usersRepository: UseCaseProxy<RegisterUser>,
  ) {}

  @Post()
  async create(@Body() body: RegisterUserBody) {
    const repository = this.usersRepository.getInstance();
    const user = await repository.execute(body);

    return UserViewModel.toHttpResponse(user);
  }
}
