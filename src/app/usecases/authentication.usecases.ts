import { IEngineerRepository } from '@app/repositories';
import { UserAuth } from '@app/model';
import { AuthCredentials } from '../entities';
import { IRefreshTokenService, IJwtService } from '../adapters';
import { Unauthorized } from '../../domain/exceptions';

export class LoginUseCases {
  constructor(
    private readonly userRepository: IEngineerRepository,
    private readonly jwtTokenService: IJwtService,
    private readonly refreshTokenService: IRefreshTokenService,
  ) {}

  async signUser(body: UserAuth) {
    const { email } = new AuthCredentials(body).value;

    const user = await this.userRepository.signUser(email);

    if (!user) {
      throw new Unauthorized({
        code_error: null,
        message: 'Invalid credentials',
      });
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
}
