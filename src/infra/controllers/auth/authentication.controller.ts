import { Controller, Post, Res, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './../../security/guard/login.guard';
import { StatusCodeResponse } from './../../../helpers/constants';
import { UserResponse } from '../presenters';

@Controller('auth')
export class AuthenticationController {
  @UseGuards(LoginGuard)
  @Post('login')
  async signIn(@Request() req, @Res() res: Response) {
    const user = req.user;

    res.status(StatusCodeResponse.OK).send(UserResponse.toHttpResponse(user));
  }
}
