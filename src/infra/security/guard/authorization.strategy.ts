import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { IJwtPayload } from '@interfaces/index';

export class AuthorizationStrategy extends PassportStrategy(
  Strategy,
  'auth-jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: false,
    });
  }

  async validate(payload: IJwtPayload) {
    return payload;
  }
}
