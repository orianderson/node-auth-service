import { makeLoginUsecases } from './../../factory';
import { ICredentials } from './../../../domain/types';
import {
  IUserRepository,
  IBcryptService,
  IJwtService,
  IRefreshTokenService,
} from '@interfaces/index';
import { LoginUsecases } from './../../../app/usecases/LoginUsecases';

export class AuthenticationAdapter {
  loginUsecases: LoginUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
  ) {
    this.loginUsecases = makeLoginUsecases(
      this.userRepository,
      this.bcryptService,
      this.jwtService,
      this.refreshTokenService,
    );
  }

  async signInUser(payload: ICredentials) {
    const response = await this.loginUsecases.signInUser(payload);

    return response;
  }
}
