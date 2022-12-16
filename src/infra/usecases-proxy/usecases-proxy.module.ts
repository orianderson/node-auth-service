import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';
import { LoginUseCases, RegisterUser } from '@app/usecases';
import { DatabaseModule } from '@infra/database';
import { DatabaseUsersRepository } from '@infra/database/repositories';
import { BcryptService, SecurityModule } from '@infra/services';

@Module({
  imports: [DatabaseModule, SecurityModule],
})
export class UsecasesProxyModule {
  static REGISTER_USER_USECASES_PROXY = 'RegisterUser';
  static LOGIN_USER_CASES_PROXY = 'LoginUsecases';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseUsersRepository, BcryptService],
          provide: UsecasesProxyModule.REGISTER_USER_USECASES_PROXY,
          useFactory: (
            usersRepository: DatabaseUsersRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(new RegisterUser(usersRepository, bcryptService)),
        },
        {
          inject: [DatabaseUsersRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USER_CASES_PROXY,
          useFactory: (
            usersRepository: DatabaseUsersRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(new LoginUseCases(usersRepository, bcryptService)),
        },
      ],
      exports: [
        UsecasesProxyModule.REGISTER_USER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USER_CASES_PROXY,
      ],
    };
  }
}
