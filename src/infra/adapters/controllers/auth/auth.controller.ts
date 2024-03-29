import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';

import { SecurityFactory, UserUsecasesFactory } from '../../factory';
import {
  PayloadCredentials,
  PayloadUserEmail,
  ResponseUser,
  ResponseUserVerified,
  PayloadCodeNumber,
} from '../dto';

import { AuthGuard } from '../../security';
import { ForbiddenException, NotFoundException } from '@helpers/exceptions';
import { StatusResponse } from '@helpers/constants';

@Controller('auth')
@ApiTags('authentication')
export class AuthControllers {
  constructor(
    private readonly usecases: UserUsecasesFactory,
    private readonly security: SecurityFactory,
  ) {}

  @Post('login')
  @ApiBasicAuth()
  async signIn(
    @Body() payload: PayloadCredentials,
    @Res() res: Response,
  ): Promise<ResponseUser> {
    const user = await this.usecases.signIn().execute(payload);

    if (user.isRight()) {
      res.status(StatusResponse.OK.statusCode).send(user.value);

      return;
    }

    throw new ForbiddenException();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Res() res: Response, @Request() req) {
    const id = req.user.id;

    await this.usecases.logout().execute(id);

    res.status(StatusResponse.NO_CONTENT.statusCode).end();
  }

  @Post('users')
  async isUser(
    @Body() payload: PayloadUserEmail,
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

  @UseGuards(AuthGuard)
  @Get('users/:code')
  async verifyCode(
    @Param() params: { code: string },
    @Res() res: Response,
    @Request() req,
  ): Promise<void> {
    const code = Number(params.code);

    const user = req.user.id;

    const isUser = await this.usecases.verifyCode().execute({
      code: code,
      email: user,
    });

    if (isUser.isLeft()) {
      throw new ForbiddenException();
    }

    res.status(StatusResponse.OK.statusCode).send(isUser.value);
  }

  @UseGuards(AuthGuard)
  @Post('password')
  async resetPassword(
    @Body() payload: { password: string },
    @Res() res: Response,
    @Request() req,
  ): Promise<void> {
    const user = req.user;

    const isValid = await this.usecases.resetPassword().execute({
      email: user.id,
      ...payload,
    });

    if (isValid.isLeft()) {
      throw new ForbiddenException();
    }

    res.status(StatusResponse.NO_CONTENT.statusCode).end();
  }

  @Get(':accessToken')
  async checkCredentials(
    @Param() params: { accessToken: string },
    @Res() res: Response,
  ) {
    const accessToken = params.accessToken;

    const userId = await this.security.checkJwtToken(accessToken);

    res.status(StatusResponse.OK.statusCode).send(userId);
  }
}
