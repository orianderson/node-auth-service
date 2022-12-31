import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EnvironmentService } from '@infra/config';
import { IRefreshTokenService, IJwtPayload } from '@interfaces/security';

@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentConfig: EnvironmentService,
  ) {}

  async checkRefreshToken(refreshToken: string): Promise<boolean> {
    const decode = await this.jwtService.verifyAsync(refreshToken);

    return decode;
  }
  createRefreshToken(payload: IJwtPayload): string {
    const secret = this.environmentConfig.getJwtRefreshSecret();

    const expiresIn = this.environmentConfig.getJwtRefreshExpirationTime();

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
