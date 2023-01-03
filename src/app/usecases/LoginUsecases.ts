import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';
import {
  IBcryptService,
  IJwtService,
  IUserRepository,
  IAuthorizationManager,
} from '@interfaces/index';
import { ICredentials } from '@domain/types';
import { Credentials } from '@domain/valueObjects';
import { IRefreshTokenService } from './../../interfaces/security/IRefreshTokenService';

export class LoginUsecases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
    private readonly authManager: IAuthorizationManager,
  ) {}

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid credentials',
    });
  }

  async signInUser(body: ICredentials) {
    const { email, password } = new Credentials(body).credentials;

    if (!email || !password) {
      this.handleException();
    }

    const user = await this.userRepository.signInUser({
      ...body,
      field: 'email',
    });

    if (!user) {
      this.handleException();
    }

    const isValid = await this.bcryptService.compare(password, user.password);

    if (!isValid) {
      this.handleException();
    }

    const payload = { _id: user.id };

    const accessToken = this.jwtService.createToken(payload);

    const refreshToken = this.refreshTokenService.createRefreshToken(payload);

    await this.authManager.setKey(user.id, {
      type: 'allowlist',
      value: refreshToken,
      expiration: Date.now() + 3 * 86400,
    });

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  // async isUser(id: string) {
  //   const userId = await this.userRepository.verifyUserByIdentity({
  //     type: 'id',
  //     id: id,
  //   });

  //   if (!userId) {
  //     this.handleException();
  //   }

  //   return userId;
  // }
}
