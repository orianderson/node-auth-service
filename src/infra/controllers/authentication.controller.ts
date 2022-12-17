import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from '@infra/common/guard';

import { UserViewModel } from './presenters';
import { JwtTokenService } from '@infra/common/security';
import { setAccessHeaders } from '@helpers/set-access-headers';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const user = req.user;

    const accessToken = this.jwtTokenService.createToken(
      { _id: user.id },
      '15m',
    );

    setAccessHeaders(res, accessToken, null);

    res.status(200).send(UserViewModel.toHttpResponse(user));
  }
}
