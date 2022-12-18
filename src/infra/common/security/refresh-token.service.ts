import { IJwtPayload } from './../../../app/adapters';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EnvironmentConfigService } from '@infra/config';
import { IRefreshTokenService } from '@app/adapters';

@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentConfig: EnvironmentConfigService,
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
