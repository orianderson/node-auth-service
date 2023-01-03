import { IAuthTokenService, IAuthorizationManager } from '@interfaces/index';
// import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';

export class LogoutUsecases {
  constructor(
    private readonly authManager: IAuthorizationManager,
    private readonly authTokenService: IAuthTokenService,
  ) {}

  // private handleException() {
  //   throw new UnauthorizedException({
  //     code_error: null,
  //     message: 'Invalid credentials',
  //   });
  // }

  async logoutUser(id: string) {
    // this.handleException();
  }
}
