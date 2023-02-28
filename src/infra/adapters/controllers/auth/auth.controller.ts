import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsecasesFactory } from '../../factory/UsecasesFactory';
import { BodyCredentials, BodyIdentityUser } from '../dto';

import { ForbiddenException } from '@helpers/exceptions';
import { StatusResponse } from '@helpers/constants';

@Controller('auth')
export class AuthControllers {
  constructor(private readonly usecases: UsecasesFactory) {}

  @Post('login')
  async signIn(
    @Body() payload: BodyCredentials,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.usecases.signIn().execute(payload);

    if (user.isRight()) {
      res.status(StatusResponse.OK.statusCode).send(user.value);

      return;
    }

    throw new ForbiddenException();
  }

  async isUser(payload: BodyIdentityUser): Promise<void> {
    const user = await this.usecases.isUser().execute(payload);

    if (user.isLeft()) {
      throw new Error();
    }
  }
}
