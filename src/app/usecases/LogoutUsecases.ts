import { IAuthTokenService, ICacheService } from '@interfaces/index';
// import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';

export class LogoutUsecases {
  constructor(
    private readonly cacheService: ICacheService,
    private readonly authTokenService: IAuthTokenService,
  ) {}

  // private handleException() {
  //   throw new UnauthorizedException({
  //     code_error: null,
  //     message: 'Invalid credentials',
  //   });
  // }

  async logoutUser(id: string) {
    await this.cacheService.delete(`refresh-token: ${id}`);
  }
}
