import { makeVerifyUserUsecases } from '../../factory';
import {
  IUserRepository,
  ICacheService,
  IMailService,
  IAuthTokenService,
} from '@interfaces/index';
import { VerifyUserUsecases } from '@app/usecases';
import { VerifyUserInterface } from '../../types';

export class VerifyUserAdapter {
  verifyUserUsecases: VerifyUserUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly cacheService: ICacheService,
    private readonly authTokenService: IAuthTokenService,
  ) {
    this.verifyUserUsecases = makeVerifyUserUsecases(
      this.userRepository,
      this.mailService,
      this.cacheService,
      this.authTokenService,
    );
  }

  async verifyUser(email: string) {
    const user = await this.verifyUserUsecases.verifyUserByEmail(email);

    return user;
  }

  async verifyCode(payload: VerifyUserInterface): Promise<string> {
    const token = await this.verifyUserUsecases.verifyCode(payload);

    return token;
  }
}
