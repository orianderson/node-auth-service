import { LogoutUsecases } from './../../../app/usecases/LogoutUsecases';
import { makeLogoutUsecases } from '../../factory';

import { IAuthTokenService, ICacheService } from '@interfaces/index';

export class LogoutAdapter {
  logoutUsecases: LogoutUsecases;
  constructor(
    private readonly cacheService: ICacheService,
    private readonly authTokenService: IAuthTokenService,
  ) {
    this.logoutUsecases = makeLogoutUsecases(
      this.cacheService,
      this.authTokenService,
    );
  }

  async logoutUser(id: string) {
    await this.logoutUsecases.logoutUser(id);
  }
}
