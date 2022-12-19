import { IUsersRepository } from '@app/repositories';
import { ICredentials } from '../../domain/types';
import { Credentials } from '../../domain/entities';
import { IRefreshTokenService, IJwtService, IBcryptService } from '../adapters';
import { UnauthorizedException } from '@helpers/exceptions';

export class LoginUseCases {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtTokenService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
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

    const user = await this.userRepository.signInUser(email);

    if (!user) {
      this.handleException();
    }

    const isValid = await this.bcryptService.compare(password, user.password);

    if (!isValid) {
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
