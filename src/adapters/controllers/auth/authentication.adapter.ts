import { makeLoginUsecases } from './../../factory';
import { ICredentials } from './../../../domain/types';
import {
  IUserRepository,
  IBcryptService,
  ICacheService,
  IAuthTokenService,
} from '@interfaces/index';
import { LoginUsecases } from './../../../app/usecases/LoginUsecases';

export class AuthenticationAdapter {
  loginUsecases: LoginUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly cacheService: ICacheService,
    private readonly authTokenService: IAuthTokenService,
  ) {
    this.loginUsecases = makeLoginUsecases(
      this.userRepository,
      this.bcryptService,
      this.cacheService,
      this.authTokenService,
    );
  }

  async signInUser(payload: ICredentials) {
    const response = await this.loginUsecases.signInUser(payload);

    return response;
  }

  async isUser(id: string) {
    const userId = await this.cacheService.isKey(id);

    return userId;
  }
}
