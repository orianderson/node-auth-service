import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { createSecurity } from '../factory';
import { IAuthGuard } from '@app/ports';

export class AuthGuard implements IAuthGuard, CanActivate {
  request: Request;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.request = context.switchToHttp().getRequest();

    const isUser = await this.handleRequest();

    this.request.user = isUser;

    return true;
  }

  async handleRequest() {
    const accessToken = this.request
      .get('authorization')
      ?.replace('Bearer', '')
      ?.trim();

    return createSecurity.checkJwtToken(accessToken);
  }
}
