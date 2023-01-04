import { RecoveryPasswordUsecases } from './../../app/usecases/RecoveryPasswordUsecases';
import { VerifyUserUsecases } from './../../app/usecases/VerifyUserUsecases';
import { LoginUsecases, LogoutUsecases } from '@app/usecases';

import {
  IUserRepository,
  IBcryptService,
  ICacheService,
  IAuthTokenService,
  IMailService,
} from '@interfaces/index';

export const makeLoginUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
  cacheService: ICacheService,
  authTokenService: IAuthTokenService,
) => {
  return new LoginUsecases(
    userRepository,
    bcryptService,
    cacheService,
    authTokenService,
  );
};

export const makeLogoutUsecases = (
  authManager: ICacheService,
  authTokenService: IAuthTokenService,
) => {
  return new LogoutUsecases(authManager, authTokenService);
};

export const makeVerifyUserUsecases = (
  userRepository: IUserRepository,
  mailService: IMailService,
  cacheService: ICacheService,
  authTokenService: IAuthTokenService,
) => {
  return new VerifyUserUsecases(
    userRepository,
    mailService,
    cacheService,
    authTokenService,
  );
};

export const makeRecoveryPasswordUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
) => {
  return new RecoveryPasswordUsecases(userRepository, bcryptService);
};
