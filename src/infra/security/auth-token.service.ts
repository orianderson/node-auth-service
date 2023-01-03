import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '@infra/config';
import { JwtService } from '@nestjs/jwt';

import { IAuthTokenService, IJwtPayload } from '@interfaces/index';

@Injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentService: EnvironmentService,
  ) {}

  createToken(payload: IJwtPayload): string {
    const tokenType = payload?.type;

    const secret = this.environmentService.getJwtSecret();
    let expiration: string;

    if (tokenType === 'accessToken') {
      expiration = this.environmentService.getJwtExpirationTime();
    } else {
      expiration = this.environmentService.getJwtRefreshExpirationTime();
    }

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiration,
    });
  }

  async checkToken(token: string): Promise<boolean> {
    const decode = await this.jwtService.verifyAsync(token);

    return decode;
  }

  decodeToken(token: string): any {
    const decode = this.jwtService.decode(token);

    return decode;
  }
}
