import { Body, Controller, Post, Inject } from '@nestjs/common';

import { UseCaseProxy } from '@infra/usecases-proxy';
import { LoginUseCases } from '@app/usecases';

import { UsecasesProxyModule } from '@infra/usecases-proxy';

import { AuthCredentialsBody } from './dto';
import { UserViewModel } from './presenters';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USER_CASES_PROXY)
    private readonly usersRepository: UseCaseProxy<LoginUseCases>,
  ) {}

  @Post()
  async login(@Body() body: AuthCredentialsBody) {
    const repository = this.usersRepository.getInstance();

    const user = await repository.signUser(body);

    return UserViewModel.toHttpResponse(user);
  }
}
