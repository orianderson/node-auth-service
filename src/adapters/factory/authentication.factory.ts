import { LoginUsecases, LogoutUsecases } from '@app/usecases';

import {
  IUserRepository,
  IBcryptService,
  IAuthorizationManager,
  IAuthTokenService,
} from '@interfaces/index';

export const makeLoginUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
  cacheService: IAuthorizationManager,
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
  authManager: IAuthorizationManager,
  authTokenService: IAuthTokenService,
) => {
  return new LogoutUsecases(authManager, authTokenService);
};
