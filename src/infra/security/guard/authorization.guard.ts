import { AuthTokenService } from './../auth-token.service';
import { Request } from 'express';
import { Injectable, ExecutionContext } from '@nestjs/common';

import { CacheService } from '@infra/database';
import { UnauthorizedException } from './../../../helpers/exceptions/Unauthorized';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizationGuard extends AuthGuard('auth-jwt-refresh') {
  private request: Request;
  constructor(
    private readonly cacheService: CacheService,
    private readonly authTokenService: AuthTokenService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    this.request = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid credentials',
    });
  }

  async handleRequest(err: any, user: any, info: any) {
    const accessToken = this.request
      .get('authorization')
      .replace('Bearer', '')
      .trim();

    if (err) {
      throw new UnauthorizedException({
        code_error: null,
        message: err.message,
      });
    }

    if (info?.message === 'jwt expired') {
      const decode = await this.authTokenService.decodeToken(accessToken);
      const userId = decode._id;
      const refreshToken = await this.cacheService.getKey(
        `refresh-token: ${userId}`,
      );

      if (!refreshToken) {
        this.handleException();
      }

      const now = Date.now();

      if (now > refreshToken.expiration) {
        this.handleException();
      } else {
        const accessToken = this.authTokenService.createToken({
          _id: userId,
          type: 'accessToken',
        });

        return {
          accessToken,
        };
      }
    }

    return user;
  }
}
