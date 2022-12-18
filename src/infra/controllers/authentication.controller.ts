import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';

import { StatusCodeResponse } from '@helpers/index';
import { LoginGuard } from '@infra/common/guard';
import { ResponseEngineer } from './presenters';

@Controller('auth')
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const user = req.user;

    res
      .status(StatusCodeResponse.OK)
      .send(ResponseEngineer.toHttpResponse(user));
  }
}
