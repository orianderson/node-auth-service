import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import {
  ControllersProxy,
  ControllersProxyModule,
} from '@infra/controllers-proxy';

import { LoginUseCases } from '@app/usecases';
import { ExceptionsService } from '@infra/exceptions/exceptions.service';
import { LoggerService } from '@infra/logger/logger.service';

import { IJwtPayload } from '@app/adapters';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ControllersProxyModule.LOGIN_USECASES)
    private readonly loginUsecasesProxy: ControllersProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.loginUsecasesProxy
      .getInstance()
      .isUser(payload._id);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return {
      _id: user.id,
    };
  }
}
