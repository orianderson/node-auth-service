import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from '@app/adapters';

import { EnvironmentConfigService } from '@infra/config';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentConfig: EnvironmentConfigService,
  ) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createToken(payload: IJwtServicePayload): string {
    const secret = this.environmentConfig.getJwtSecret();

    const expiresIn = this.environmentConfig.getJwtExpirationTime();

    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
