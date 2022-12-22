import { CacheService } from './../database/cache/cache.service';
import { DynamicModule, Module } from '@nestjs/common';

import { ControllersProxy } from './controllers-proxy';
import {
  DatabaseModule,
  EngineerRepository,
  UsersRepository,
} from '@infra/database';
import {
  BcryptService,
  AdaptersModule,
  JwtTokenService,
  RefreshTokenService,
  MailService,
} from '@infra/adapters';
import {
  EnvironmentConfigService,
  EnvironmentConfigModule,
} from '@infra/config';

import {
  EngineerControllerAdapter,
  AuthControllerAdapter,
  VerifyUserControllerAdapter,
} from '@adapters/controllers';

@Module({
  imports: [DatabaseModule, AdaptersModule, EnvironmentConfigModule],
})
export class ControllersProxyModule {
  static REGISTER_ENGINEER_USECASES = 'RegisterEngineerUsecases';
  static LOGIN_USECASES = 'AuthControllerAdapter';
  static VERIFY_USER_USECASES = 'VerifyUserControllerAdapter';

  static register(): DynamicModule {
    return {
      module: ControllersProxyModule,
      providers: [
        {
          inject: [EngineerRepository, BcryptService],
          provide: ControllersProxyModule.REGISTER_ENGINEER_USECASES,
          useFactory: (
            engineerRepository: EngineerRepository,
            bcryptService: BcryptService,
          ) =>
            new ControllersProxy(
              new EngineerControllerAdapter(engineerRepository, bcryptService),
            ),
        },
        {
          inject: [
            UsersRepository,
            BcryptService,
            JwtTokenService,
            RefreshTokenService,
          ],
          provide: ControllersProxyModule.LOGIN_USECASES,
          useFactory: (
            usersRepository: UsersRepository,
            bcryptService: BcryptService,
            jwtTokenService: JwtTokenService,
            refreshTokenService: RefreshTokenService,
          ) =>
            new ControllersProxy(
              new AuthControllerAdapter(
                usersRepository,
                bcryptService,
                jwtTokenService,
                refreshTokenService,
              ),
            ),
        },
        {
          inject: [
            UsersRepository,
            MailService,
            EnvironmentConfigService,
            CacheService,
          ],
          provide: ControllersProxyModule.VERIFY_USER_USECASES,
          useFactory: (
            usersRepository: UsersRepository,
            mailService: MailService,
            environmentConfig: EnvironmentConfigService,
            cacheService: CacheService,
          ) =>
            new ControllersProxy(
              new VerifyUserControllerAdapter(
                usersRepository,
                mailService,
                environmentConfig,
                cacheService,
              ),
            ),
        },
      ],
      exports: [
        ControllersProxyModule.REGISTER_ENGINEER_USECASES,
        ControllersProxyModule.LOGIN_USECASES,
        ControllersProxyModule.VERIFY_USER_USECASES,
      ],
    };
  }
}
