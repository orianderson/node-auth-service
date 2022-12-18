import { Body, Controller, Post, Inject, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy';
import { RegisterEngineerUsecases } from '../../app/usecases';
import { RegisterEngineerBody } from './dto';
import { ResponseEngineer } from './presenters';

import { StatusCodeResponse } from '../../helpers';

@Controller('users')
export class EngineerControllers {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_ENGINEER_USECASES_PROXY)
    private readonly engineerRepository: UseCaseProxy<RegisterEngineerUsecases>,
  ) {}

  @Post()
  async create(@Body() body: RegisterEngineerBody, @Res() res: Response) {
    const repository = this.engineerRepository.getInstance();

    const user = await repository.execute(body);

    res
      .status(StatusCodeResponse.CREATED)
      .send(ResponseEngineer.toHttpResponse(user));
  }
}
