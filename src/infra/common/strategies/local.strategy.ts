import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthControllerAdapter } from '@adapters/controllers';
import {
  ControllersProxy,
  ControllersProxyModule,
} from '@infra/controllers-proxy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ControllersProxyModule.LOGIN_USECASES)
    private readonly loginUsecases: ControllersProxy<AuthControllerAdapter>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.loginUsecases.getInstance().signInUser({
      email: email,
      password: password,
    });

    return user;
  }
}
