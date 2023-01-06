import { AuthTokenService } from './../auth-token.service';
import { Request } from 'express';
import { Injectable, ExecutionContext } from '@nestjs/common';

import { CacheService } from '@infra/database';
import { UnauthorizedException } from './../../../helpers/exceptions/Unauthorized';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizationGuard extends AuthGuard('auth-jwt-refresh') {
  private request: Request;
  private refreshPath = '/api/v1/auth/refresh-token';
  private logoutPath = '/api/v1/auth/logout';
  private userId: string;
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

  private async getUserId() {
    const accessToken = this.request
      .get('authorization')
      .replace('Bearer', '')
      .trim();

    const decode = await this.authTokenService.decodeToken(accessToken);

    this.userId = decode._id;
  }

  private async handleRefreshToken() {
    const now = Date.now();
    const refreshToken = await this.cacheService.getKey(
      `refresh-token: ${this.userId}`,
    );

    if (!refreshToken || now < refreshToken.expiration) {
      this.handleException();
    }
  }

  async handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.handleException();
    }

    const path = this.request.path;

    if (info?.message === 'jwt expired') {
      await this.getUserId();
      if (path === this.refreshPath) {
        await this.handleRefreshToken();

        const accessToken = this.authTokenService.createToken({
          _id: this.userId,
          type: 'accessToken',
        });

        return {
          accessToken,
        };
      }

      if (path === this.logoutPath) {
        return {
          _id: this.userId,
        };
      }
    }

    return user;
  }
}
