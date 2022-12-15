import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';
import { RegisterUser } from '@app/usecases';
import { DatabaseModule } from '@infra/database';
import { PrismaUsersRepository } from '@infra/database/repositories';

@Module({
  imports: [DatabaseModule],
})
export class UsecasesProxyModule {
  static REGISTER_USER_USECASES_PROXY = 'RegisterUser';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [PrismaUsersRepository],
          provide: UsecasesProxyModule.REGISTER_USER_USECASES_PROXY,
          useFactory: (usersRepository: PrismaUsersRepository) =>
            new UseCaseProxy(new RegisterUser(usersRepository)),
        },
      ],
      exports: [UsecasesProxyModule.REGISTER_USER_USECASES_PROXY],
    };
  }
}
