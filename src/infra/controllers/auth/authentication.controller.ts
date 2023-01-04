import {
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
  Body,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';

import { AdaptersProxyModule, AdaptersProxy } from '@infra/index';
import { VerifyUserAdapter } from './../../../adapters/controllers/auth/verify-user.adapter';

import { LoginGuard } from './../../security/guard/login.guard';
import { StatusCodeResponse } from './../../../helpers/constants';
import { UserResponse } from '../presenters';
import { VerifyEmailPayload } from '../dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AdaptersProxyModule.VERIFY_USER_USECASES)
    private readonly verifyUserAdapter: AdaptersProxy<VerifyUserAdapter>,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async signIn(@Request() req, @Res() res: Response) {
    const user = req.user;

    res.status(StatusCodeResponse.OK).send(UserResponse.toHttpResponse(user));
  }

  @Post('verify-user')
  async verifyUser(@Body() payload: VerifyEmailPayload, @Res() res: Response) {
    await this.verifyUserAdapter.getInstance().verifyUser(payload.email);

    res.status(StatusCodeResponse.NO_CONTENT).end();
  }
}
