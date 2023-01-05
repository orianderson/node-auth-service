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
import {
  VerifyUserAdapter,
  RecoveryPasswordAdapter,
} from './../../../adapters/controllers';

import {
  LoginGuard,
  AuthenticationGuard,
  AuthorizationGuard,
} from './../../security/guard';
import { StatusCodeResponse } from './../../../helpers/constants';
import { UserResponse } from '../presenters';
import { VerifyEmailPayload, VerifyCodePayload, PasswordPayload } from '../dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(AdaptersProxyModule.VERIFY_USER_USECASES)
    private readonly verifyUserAdapter: AdaptersProxy<VerifyUserAdapter>,
    @Inject(AdaptersProxyModule.RECOVERY_PASS_USECASES)
    private readonly recoveryPassUseCases: AdaptersProxy<RecoveryPasswordAdapter>,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async signIn(@Request() req, @Res() res: Response) {
    const user = req.user;

    res.status(StatusCodeResponse.OK).send(UserResponse.toHttpResponse(user));
  }

  @Post('verify-user')
  async verifyUser(@Body() payload: VerifyEmailPayload, @Res() res: Response) {
    const user = await this.verifyUserAdapter
      .getInstance()
      .verifyUser(payload.email);

    res.status(StatusCodeResponse.OK).send({
      userId: user.id,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('verify-code')
  async verifyCode(
    @Body() payload: VerifyCodePayload,
    @Res() res: Response,
    @Request() req,
  ) {
    const userId = req.user._id;

    const token = await this.verifyUserAdapter.getInstance().verifyCode({
      code: Number(payload.code),
      id: userId,
    });

    res.status(StatusCodeResponse.OK).send({
      userId: token,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('recovery-password')
  async updatePassword(
    @Body() payload: PasswordPayload,
    @Res() res: Response,
    @Request() req,
  ) {
    const userId = req.user._id;

    await this.recoveryPassUseCases
      .getInstance()
      .update(userId, payload.password);

    res.status(StatusCodeResponse.NO_CONTENT).end();
  }

  @UseGuards(AuthorizationGuard)
  @Post('test')
  async test(@Res() res: Response, @Request() req) {
    const user = req.user;

    res.status(200).send(user);
  }
}
