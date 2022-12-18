import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';
import { LoginUseCases, RegisterEngineerUsecases } from '@app/usecases';
import { DatabaseModule } from '@infra/database';
import { EngineerRepository } from '@infra/database/repositories';
import {
  BcryptService,
  SecurityModule,
  JwtTokenService,
  RefreshTokenService,
} from '@infra/common/security';

@Module({
  imports: [DatabaseModule, SecurityModule],
})
export class UsecasesProxyModule {
  static REGISTER_ENGINEER_USECASES_PROXY = 'RegisterEngineerUsecases';
  static LOGIN_USER_CASES_PROXY = 'LoginUsecases';

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
          provide: UsecasesProxyModule.LOGIN_USER_CASES_PROXY,
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
        UsecasesProxyModule.LOGIN_USER_CASES_PROXY,
      ],
    };
  }
}
