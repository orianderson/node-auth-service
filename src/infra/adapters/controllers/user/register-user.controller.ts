import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { StatusResponse } from '@helpers/constants';
import { UserPayload } from '../dto';
import { UserUsecasesFactory } from '../../factory';

@Controller('users')
@ApiTags('users')
export class UserControllers {
  constructor(private readonly usecases: UserUsecasesFactory) {}

  @Post()
  async create(
    @Body() payload: UserPayload,
    @Res() res: Response,
  ): Promise<void> {
    await this.usecases.registerUser().execute(payload);

    res.status(StatusResponse.CREATED.statusCode).end();
  }
}
