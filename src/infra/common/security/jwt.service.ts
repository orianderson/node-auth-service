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

  createToken(payload: IJwtServicePayload, expiresIn: string): string {
    const secret = this.environmentConfig.getJwtSecret();
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn ? expiresIn : '15m',
    });
  }
}
