import { makeVerifyUserUsecases } from '../../factory';
import {
  IUserRepository,
  ICacheService,
  IMailService,
} from '@interfaces/index';
import { VerifyUserUsecases } from '@app/usecases';
import { VerifyUserInterface } from '../../types';

export class VerifyUserAdapter {
  verifyUserUsecases: VerifyUserUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly cacheService: ICacheService,
  ) {
    this.verifyUserUsecases = makeVerifyUserUsecases(
      this.userRepository,
      this.mailService,
      this.cacheService,
    );
  }

  async verifyUser(email: string) {
    const user = await this.verifyUserUsecases.verifyUserByEmail(email);

    return user;
  }

  async verifyCode(payload: VerifyUserInterface) {
    await this.verifyUserUsecases.verifyCode(payload);
  }
}
