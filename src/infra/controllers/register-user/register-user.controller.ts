import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { StatusCodeResponse } from './../../../helpers/constants/status-code-response';
import { AdaptersProxy, AdaptersProxyModule } from '@infra/adapters-proxy';
import { RegisterUserAdapter } from '@adapters/controllers';
import { RegisterUserPayload } from '../dto';

@Controller('users')
export class RegisterUserController {
  constructor(
    @Inject(AdaptersProxyModule.REGISTER_USER_USECASES)
    private readonly registerUserAdapter: AdaptersProxy<RegisterUserAdapter>,
  ) {}

  @Post()
  async create(@Body() payload: RegisterUserPayload, @Res() res: Response) {
    await this.registerUserAdapter.getInstance().create(payload);

    res.status(StatusCodeResponse.CREATED).end();
  }
}
