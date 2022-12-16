import { BadRequestInterface } from '../exceptions';

import { UserAuth } from '../model';

export class AuthCredentials {
  private credentials: UserAuth;

  constructor(credentials: UserAuth) {
    this.verifyIfFieldsIsEmpty(credentials);
  }

  get value(): UserAuth {
    return this.credentials;
  }

  private verifyIfFieldsIsEmpty(credentials: UserAuth) {
    const fields = ['email', 'password'];

    fields.forEach((item) => {
      if (!credentials[item]) {
        throw new BadRequestInterface({
          message: `O campo ${item} deve ser preenchido`,
          code_error: null,
        });
      }
    });

    this.credentials = credentials;
  }
}
