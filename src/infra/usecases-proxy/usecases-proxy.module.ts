import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';
import { RegisterUser } from '@app/usecases';
import { DatabaseModule } from '@infra/database';
import { DatabaseUsersRepository } from '@infra/database/repositories';
import { BcryptService, SecurityModule } from '@infra/services';

@Module({
  imports: [DatabaseModule, SecurityModule],
})
export class UsecasesProxyModule {
  static REGISTER_USER_USECASES_PROXY = 'RegisterUser';

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
      ],
      exports: [UsecasesProxyModule.REGISTER_USER_USECASES_PROXY],
    };
  }
}
