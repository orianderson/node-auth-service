import { LoginUseCases } from '@app/usecases';
import { authControllerFactory } from '@adapters/factory';
import { ICredentials } from '@domain/types';
import {
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
} from '@app/adapters';
import { IUsersRepository } from '@app/repositories';

export class AuthControllerAdapter {
  authenticationUsecases: LoginUseCases;
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
  ) {
    this.authenticationUsecases = authControllerFactory(
      this.usersRepository,
      this.bcryptService,
      this.jwtService,
      this.refreshTokenService,
    );
  }

  async signInUser(payload: ICredentials) {
    const user = await this.authenticationUsecases.signInUser(payload);

    return user;
  }
}
