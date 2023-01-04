import { MailService } from './../services/mail/mail.service';
import { DynamicModule, forwardRef, Module } from '@nestjs/common';

import { AdaptersProxy } from './adapters-proxy';
import {
  RegisterUserAdapter,
  LogoutAdapter,
  VerifyUserAdapter,
  RecoveryPasswordAdapter,
} from '@adapters/index';
import {
  BcryptService,
  SecurityModule,
  AuthTokenService,
} from '@infra/security';
import { UserRepository, DatabaseModule, CacheService } from '@infra/database';
import { ServicesModule } from '@infra/services';
import { EnvironmentModule, EnvironmentService } from '../config';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => SecurityModule),
    EnvironmentModule,
    ServicesModule,
  ],
})
export class AdaptersProxyModule {
  static REGISTER_USER_USECASES = 'RegisterUserAdapter';
  static LOGOUT_USECASES = 'LogoutAdapter';
  static VERIFY_USER_USECASES = 'VerifyUserAdapter';
  static RECOVERY_PASS_USECASES = 'RecoveryPasswordAdapter';

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
          inject: [CacheService, AuthTokenService],
          provide: AdaptersProxyModule.LOGOUT_USECASES,
          useFactory: (
            authManager: CacheService,
            authTokenService: AuthTokenService,
          ) =>
            new AdaptersProxy(new LogoutAdapter(authManager, authTokenService)),
        },
        {
          inject: [UserRepository, MailService, CacheService, AuthTokenService],
          provide: AdaptersProxyModule.VERIFY_USER_USECASES,
          useFactory: (
            userRepository: UserRepository,
            mailService: MailService,
            cacheService: CacheService,
            authTokenService: AuthTokenService,
          ) =>
            new AdaptersProxy(
              new VerifyUserAdapter(
                userRepository,
                mailService,
                cacheService,
                authTokenService,
              ),
            ),
        },
        {
          inject: [UserRepository, BcryptService],
          provide: AdaptersProxyModule.RECOVERY_PASS_USECASES,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new AdaptersProxy(
              new RecoveryPasswordAdapter(userRepository, bcryptService),
            ),
        },
      ],
      exports: [
        AdaptersProxyModule.REGISTER_USER_USECASES,
        AdaptersProxyModule.LOGOUT_USECASES,
        AdaptersProxyModule.VERIFY_USER_USECASES,
        AdaptersProxyModule.RECOVERY_PASS_USECASES,
      ],
    };
  }
}
