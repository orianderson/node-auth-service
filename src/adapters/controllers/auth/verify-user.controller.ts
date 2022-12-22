import { ICacheService } from '@app/cache';
import { IEnvironmentConfig } from '@app/config';
import { IMailService } from '@app/adapters';
import { IUsersRepository } from '@app/repositories';
import { VerifyUserUseCases } from '@app/usecases';

export class VerifyUserControllerAdapter {
  private verifyUserUseCases: VerifyUserUseCases;
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly mailService: IMailService,
    private readonly environmentConfig: IEnvironmentConfig,
    private readonly cacheService: ICacheService,
  ) {
    this.verifyUserUseCases = new VerifyUserUseCases(
      this.usersRepository,
      this.mailService,
      this.environmentConfig,
      this.cacheService,
    );
  }

  async verifyUser(email: string) {
    const userId = await this.verifyUserUseCases.verifyUserByEmail(email);

    return userId;
  }
}
