import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CredentialsPayload } from './../dto/CredentialsPayload';
import { StatusCodeResponse } from './../../../helpers/constants';
import { AuthenticationAdapter } from '@adapters/index';
import { AdaptersProxyModule, AdaptersProxy } from '@infra/index';
import { UserResponse } from '../presenters';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AdaptersProxyModule.LOGIN_USECASES)
    private readonly authenticationAdapter: AdaptersProxy<AuthenticationAdapter>,
  ) {}

  @Post('login')
  async signIn(@Body() payload: CredentialsPayload, @Res() res: Response) {
    const user = await this.authenticationAdapter
      .getInstance()
      .signInUser(payload);

    res.status(StatusCodeResponse.OK).send(UserResponse.toHttpResponse(user));
  }
}
