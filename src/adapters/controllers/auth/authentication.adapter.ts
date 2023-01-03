import { makeLoginUsecases } from './../../factory';
import { ICredentials } from './../../../domain/types';
import {
  IUserRepository,
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
  IAuthorizationManager,
  IAuthTokenService,
} from '@interfaces/index';
import { LoginUsecases } from './../../../app/usecases/LoginUsecases';

export class AuthenticationAdapter {
  loginUsecases: LoginUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly authManager: IAuthorizationManager,
    private readonly authTokenService: IAuthTokenService,
  ) {
    this.loginUsecases = makeLoginUsecases(
      this.userRepository,
      this.bcryptService,
      this.authManager,
      this.authTokenService,
    );
  }

  async signInUser(payload: ICredentials) {
    const response = await this.loginUsecases.signInUser(payload);

    return response;
  }
}
