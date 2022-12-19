import { Body, Controller, Post, Inject, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  ControllersProxyModule,
  ControllersProxy,
} from '@infra/controllers-proxy';
import { EngineerControllerAdapter } from '@adapters/controllers';
import { RegisterEngineerBody } from '@infra/controllers/dto';
import { ResponseEngineer } from '@infra/controllers/presenters';

import { StatusCodeResponse } from '@helpers/index';

@Controller('engineers')
export class RegisterEngineerControllers {
  constructor(
    @Inject(ControllersProxyModule.REGISTER_ENGINEER_USECASES)
    private readonly engineerControllerAdapter: ControllersProxy<EngineerControllerAdapter>,
  ) {}

  @Post()
  async create(@Body() payload: RegisterEngineerBody, @Res() res: Response) {
    const controller = this.engineerControllerAdapter.getInstance();

    const engineer = await controller.create(payload);

    res
      .status(StatusCodeResponse.CREATED)
      .send(ResponseEngineer.toHttpResponse(engineer));
  }
}
