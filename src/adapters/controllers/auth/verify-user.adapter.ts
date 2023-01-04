import { makeVerifyUserUsecases } from '../../factory';
import {
  IUserRepository,
  ICacheService,
  IMailService,
} from '@interfaces/index';
import { VerifyUserUsecases } from '@app/usecases';

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
    await this.verifyUserUsecases.verifyUserByEmail(email);
  }
}
