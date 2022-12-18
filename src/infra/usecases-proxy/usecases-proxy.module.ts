import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';
import { LoginUseCases, RegisterEngineerUsecases } from '@app/usecases';
import { DatabaseModule } from '@infra/database';
import { EngineerRepository } from '@infra/database/repositories';

import {
  BcryptService,
  AdaptersModule,
  JwtTokenService,
  RefreshTokenService,
} from '@infra/adapters';

@Module({
  imports: [DatabaseModule, AdaptersModule],
})
export class UsecasesProxyModule {
  static REGISTER_ENGINEER_USECASES_PROXY = 'RegisterEngineerUsecases';
  static LOGIN_USECASES_PROXY = 'LoginUsecases';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [EngineerRepository, BcryptService],
          provide: UsecasesProxyModule.REGISTER_ENGINEER_USECASES_PROXY,
          useFactory: (
            usersRepository: EngineerRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new RegisterEngineerUsecases(usersRepository, bcryptService),
            ),
        },
        {
          inject: [EngineerRepository, JwtTokenService, RefreshTokenService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            usersRepository: EngineerRepository,
            jwtTokenService: JwtTokenService,
            refreshTokenService: RefreshTokenService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                usersRepository,
                jwtTokenService,
                refreshTokenService,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.REGISTER_ENGINEER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
      ],
    };
  }
}
