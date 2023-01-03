import { LogoutUsecases } from './../../../app/usecases/LogoutUsecases';
import { makeLogoutUsecases } from '../../factory';

import { IAuthTokenService, IAuthorizationManager } from '@interfaces/index';

export class LogoutAdapter {
  logoutUsecases: LogoutUsecases;
  constructor(
    private readonly authManager: IAuthorizationManager,
    private readonly authTokenService: IAuthTokenService,
  ) {
    this.logoutUsecases = makeLogoutUsecases(
      this.authManager,
      this.authTokenService,
    );
  }

  async logoutUser(id: string) {
    await this.logoutUsecases.logoutUser(id);
  }
}
