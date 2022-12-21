import { Body, Controller, Inject, Post, Res } from '@nestjs/common';

import { VerifyUserControllerAdapter } from './../../../adapters/controllers/auth/verify-user.controller';
import {
  ControllersProxyModule,
  ControllersProxy,
} from '@infra/controllers-proxy';
import { RecoveryPasswordBody } from './../dto/RecoveryPassword';
import { Response } from 'express';

import { ConfirmUserResponse } from '@infra/controllers/presenters';
import { StatusCodeResponse } from '@helpers/index';

@Controller('auth')
export class VerifyUserController {
  constructor(
    @Inject(ControllersProxyModule.VERIFY_USER_USECASES)
    private readonly verifyUserUsecases: ControllersProxy<VerifyUserControllerAdapter>,
  ) {}
  @Post('recovery-password')
  async verifyUser(@Body() body: RecoveryPasswordBody, @Res() res: Response) {
    const { email } = body;

    const controller = this.verifyUserUsecases.getInstance();

    const userId = await controller.verifyUser(email);

    res
      .status(StatusCodeResponse.OK)
      .send(ConfirmUserResponse.toHttpResponse(userId));
  }
}
