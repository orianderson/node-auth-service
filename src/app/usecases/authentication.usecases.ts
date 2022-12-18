import { IEngineerRepository } from '@app/repositories';
import { ICredentials } from '../../domain/types';
import { Credentials } from '../../domain/entities';
import { IRefreshTokenService, IJwtService } from '../adapters';
import { UnauthorizedException } from '@helpers/exceptions';

export class LoginUseCases {
  constructor(
    private readonly userRepository: IEngineerRepository,
    private readonly jwtTokenService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
  ) {}

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid credentials',
    });
  }

  async signUser(body: ICredentials) {
    const { email } = new Credentials(body).credentials;

    const user = await this.userRepository.signUser(email);

    if (!user) {
      this.handleException();
    }

    const payload = { _id: user.id };

    const accessToken = this.jwtTokenService.createToken(payload);

    const refreshToken = this.refreshTokenService.createRefreshToken(payload);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async isUser(id: string) {
    const user = await this.userRepository.verifyUserById(id);

    if (!user) {
      this.handleException();
    }

    return user;
  }
}
