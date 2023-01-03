import { Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LogoutAdapter } from './../../../adapters';
import { AdaptersProxyModule, AdaptersProxy } from './../../adapters-proxy';
import { StatusCodeResponse } from './../../../helpers';

// import {} from ''

@Controller('auth')
export class LogoutController {
  constructor(
    @Inject(AdaptersProxyModule.LOGOUT_USECASES)
    private readonly logoutAdapter: AdaptersProxy<LogoutAdapter>,
  ) {}

  @Post('logout')
  async logout(@Res() res: Response) {
    await this.logoutAdapter.getInstance().logoutUser('123456');

    res.status(StatusCodeResponse.NO_CONTENT).end();
  }
}
