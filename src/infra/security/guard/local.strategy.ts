import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthenticationAdapter } from '@adapters/index';
import { AdaptersProxy, AdaptersProxyModule } from '@infra/adapters-proxy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AdaptersProxyModule.LOGIN_USECASES)
    private readonly loginUsecases: AdaptersProxy<AuthenticationAdapter>,
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
