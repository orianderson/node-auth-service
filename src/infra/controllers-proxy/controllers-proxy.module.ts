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
} from '@infra/adapters';

import {
  EngineerControllerAdapter,
  AuthControllerAdapter,
} from '@adapters/controllers';

@Module({
  imports: [DatabaseModule, AdaptersModule],
})
export class ControllersProxyModule {
  static REGISTER_ENGINEER_USECASES = 'RegisterEngineerUsecases';
  static LOGIN_USECASES = 'AuthControllerAdapter';

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
      ],
      exports: [
        ControllersProxyModule.REGISTER_ENGINEER_USECASES,
        ControllersProxyModule.LOGIN_USECASES,
      ],
    };
  }
}
