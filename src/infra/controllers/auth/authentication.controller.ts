import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from '@infra/common/guard';
import { ResponseEngineer } from '@infra/controllers/presenters';

import { StatusCodeResponse } from '@helpers/index';

@Controller('auth')
export class AuthenticationControllers {
  @UseGuards(LoginGuard)
  @Post('login')
  async signInUser(@Request() req, @Res() res: Response) {
    const user = req.user;

    res
      .status(StatusCodeResponse.OK)
      .send(ResponseEngineer.toHttpResponse(user));
  }
}
