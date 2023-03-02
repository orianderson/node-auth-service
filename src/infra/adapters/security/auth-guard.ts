import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { createSecurity } from '../factory';
import { IAuthGuard } from '@app/ports';

export class AuthGuard implements IAuthGuard, CanActivate {
  request: Request;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.request = context.switchToHttp().getRequest();

    const isUser = this.handleRequest();

    this.request.user = isUser;

    return true;
  }

  handleRequest() {
    const accessToken = this.request
      .get('authorization')
      .replace('Bearer', '')
      .trim();

    return createSecurity.checkJwtToken(accessToken);
  }
}
