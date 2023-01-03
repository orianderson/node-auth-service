import { DynamicModule, forwardRef, Module } from '@nestjs/common';

import { AdaptersProxy } from './adapters-proxy';
import { RegisterUserAdapter, AuthenticationAdapter } from '@adapters/index';
import {
  BcryptService,
  SecurityModule,
  AuthTokenService,
} from '@infra/security';
import { UserRepository, DatabaseModule, CacheService } from '@infra/database';
import { EnvironmentModule, EnvironmentService } from '../config';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => SecurityModule),
    EnvironmentModule,
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
          inject: [
            UserRepository,
            BcryptService,
            CacheService,
            AuthTokenService,
          ],
          provide: AdaptersProxyModule.LOGIN_USECASES,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
            authManager: CacheService,
            authTokenService: AuthTokenService,
          ) =>
            new AdaptersProxy(
              new AuthenticationAdapter(
                userRepository,
                bcryptService,
                authManager,
                authTokenService,
              ),
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
