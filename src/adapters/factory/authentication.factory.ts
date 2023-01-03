import { LoginUsecases } from '@app/usecases';

import {
  IUserRepository,
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
  IAuthorizationManager,
} from '@interfaces/index';

export const makeLoginUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
  jwtService: IJwtService,
  refreshTokenService: IRefreshTokenService,
  cacheService: IAuthorizationManager,
) => {
  return new LoginUsecases(
    userRepository,
    bcryptService,
    jwtService,
    refreshTokenService,
    cacheService,
  );
};
