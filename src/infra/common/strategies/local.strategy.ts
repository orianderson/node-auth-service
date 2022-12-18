import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '@app/usecases';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { BcryptService } from '@infra/adapters';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecases: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly bcryptService: BcryptService,
  ) {
    super({ usernameField: 'email' });
  }

  private handleException() {
    this.logger.warn('LocalStrategy', `Invalid email or password`);
    this.exceptionService.UnauthorizedException({
      message: 'Invalid email or password.',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.loginUsecases.getInstance().signUser({
      email: email,
      password: password,
    });

    if (!user) {
      this.handleException();
    }

    const isValid = await this.bcryptService.compare(password, user.password);

    if (!isValid) {
      this.handleException();
    }
    return user;
  }
}
