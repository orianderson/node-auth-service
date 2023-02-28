import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { StatusResponse } from '@helpers/constants';
import { BodyCreateUser, ResponseCreatedUser } from '../dto';
import { UsecasesFactory } from '../../factory';

@Controller('users')
export class UserControllers {
  constructor(private readonly usecases: UsecasesFactory) {}

  @Post()
  async create(
    @Body() payload: BodyCreateUser,
    @Res() res: Response,
  ): Promise<void> {
    await this.usecases.registerUser().execute(payload);

    res.status(StatusResponse.CREATED.statusCode).end();
  }
}
