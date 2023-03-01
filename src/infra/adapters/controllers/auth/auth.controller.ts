import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserUsecasesFactory } from '../../factory';
import {
  BodyCredentials,
  BodyIdentityUser,
  ResponseSignIn,
  ResponseUserVerified,
  BodyVerifyCode,
} from '../dto';

import { ForbiddenException, NotFoundException } from '@helpers/exceptions';
import { StatusResponse } from '@helpers/constants';

@Controller('auth')
export class AuthControllers {
  constructor(private readonly usecases: UserUsecasesFactory) {}

  @Post('login')
  async signIn(
    @Body() payload: BodyCredentials,
    @Res() res: Response,
  ): Promise<ResponseSignIn> {
    const user = await this.usecases.signIn().execute(payload);

    if (user.isRight()) {
      res.status(StatusResponse.OK.statusCode).send(user.value);

      return;
    }

    throw new ForbiddenException();
  }

  @Post('verify-user')
  async isUser(
    @Body() payload: BodyIdentityUser,
    @Res() res: Response,
  ): Promise<ResponseUserVerified> {
    const user = await this.usecases.isUser().execute(payload);

    if (user.isLeft()) {
      throw new NotFoundException();
    }

    res.status(StatusResponse.OK.statusCode).send({
      message: 'Code successfully sended to your email',
      accessToken: user.value,
    });

    return;
  }

  @Post('verify-code')
  async verifyCode(
    @Body() payload: BodyVerifyCode,
    @Res() res: Response,
  ): Promise<void> {
    const code = Number(payload.code);
    const isUser = await this.usecases.verifyCode().execute({
      code: code,
      email: 'and.orisistem@gmail.com',
    });

    if (isUser.isLeft()) {
      throw new ForbiddenException();
    }

    res.status(StatusResponse.NO_CONTENT.statusCode).end();
  }
}
