import { AuthTokenService } from './../auth-token.service';
import { CacheService } from '@infra/database';
import { BcryptService } from './../bcrypt/bcrypt.service';
import { UserRepository } from './../../database/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthenticationAdapter } from '../../../adapters';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  authenticationAdapter: AuthenticationAdapter;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly authManager: CacheService,
    private readonly authTokenService: AuthTokenService,
  ) {
    super({ usernameField: 'email' });
    this.authenticationAdapter = new AuthenticationAdapter(
      this.userRepository,
      this.bcryptService,
      this.authManager,
      this.authTokenService,
    );
  }

  async validate(email: string, password: string) {
    const user = await this.authenticationAdapter.signInUser({
      email: email,
      password: password,
    });

    return user;
  }
}
