import { LoginUseCases } from '@app/usecases';
import { IUsersRepository } from '@app/repositories';
import {
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
} from '@app/adapters';

export const authControllerFactory = (
  usersRepository: IUsersRepository,
  bcryptService: IBcryptService,
  jwtService: IJwtService,
  refreshTokenService: IRefreshTokenService,
) => {
  return new LoginUseCases(
    usersRepository,
    bcryptService,
    jwtService,
    refreshTokenService,
  );
};
