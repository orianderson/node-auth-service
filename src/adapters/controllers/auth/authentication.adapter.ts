import { makeLoginUsecases } from './../../factory';
import { ICredentials } from './../../../domain/types';
import { IUserRepository, IBcryptService } from '@interfaces/index';
import { LoginUsecases } from './../../../app/usecases/LoginUsecases';

export class AuthenticationAdapter {
  loginUsecases: LoginUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {
    this.loginUsecases = makeLoginUsecases(
      this.userRepository,
      this.bcryptService,
    );
  }

  async signInUser(payload: ICredentials) {
    const response = await this.loginUsecases.signInUser(payload);

    return response;
  }
}
