import { LoginUsecases } from '@app/usecases';

import {
  IUserRepository,
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
} from '@interfaces/index';

export const makeLoginUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
  jwtService: IJwtService,
  refreshTokenService: IRefreshTokenService,
) => {
  return new LoginUsecases(
    userRepository,
    bcryptService,
    jwtService,
    refreshTokenService,
  );
};
