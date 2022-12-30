import { DynamicModule, Module } from '@nestjs/common';

import { AdaptersProxy } from './adapters-proxy';
import { RegisterUserAdapter, AuthenticationAdapter } from '@adapters/index';
import { BcryptService } from '@infra/security';
import {
  DatabaseClient,
  UserDatabaseService,
  UserRepository,
} from '@infra/database';

@Module({
  providers: [
    DatabaseClient,
    UserDatabaseService,
    BcryptService,
    UserRepository,
  ],
})
export class AdaptersProxyModule {
  static REGISTER_USER_USECASES = 'RegisterUserAdapter';
  static LOGIN_USECASES = 'AuthenticationAdapter';

  static register(): DynamicModule {
    return {
      module: AdaptersProxyModule,
      providers: [
        {
          inject: [UserRepository, BcryptService],
          provide: AdaptersProxyModule.REGISTER_USER_USECASES,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new AdaptersProxy(
              new RegisterUserAdapter(userRepository, bcryptService),
            ),
        },
        {
          inject: [UserRepository, BcryptService],
          provide: AdaptersProxyModule.LOGIN_USECASES,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new AdaptersProxy(
              new AuthenticationAdapter(userRepository, bcryptService),
            ),
        },
      ],
      exports: [
        AdaptersProxyModule.REGISTER_USER_USECASES,
        AdaptersProxyModule.LOGIN_USECASES,
      ],
    };
  }
}
