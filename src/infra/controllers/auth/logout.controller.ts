import {
  Controller,
  Inject,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LogoutAdapter } from './../../../adapters';
import { AdaptersProxyModule, AdaptersProxy } from './../../adapters-proxy';
import { StatusCodeResponse } from './../../../helpers';

import { AuthenticationGuard } from '../../security/guard';

@Controller('auth')
export class LogoutController {
  constructor(
    @Inject(AdaptersProxyModule.LOGOUT_USECASES)
    private readonly logoutAdapter: AdaptersProxy<LogoutAdapter>,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    const user = req.user;

    // await this.logoutAdapter.getInstance().logoutUser('123456');

    res.status(StatusCodeResponse.OK).send(user);
  }
}
