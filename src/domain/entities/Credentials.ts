import { BadRequest } from '../exceptions/BadRequest';

import { ICredentials } from '../types';

export class Credentials {
  private props: ICredentials;

  constructor(credentials: ICredentials) {
    this.verifyIfFieldsIsEmpty(credentials);
  }

  get credentials(): ICredentials {
    return this.props;
  }

  private verifyIfFieldsIsEmpty(credentials: ICredentials) {
    const fields = ['email', 'password'];

    fields.forEach((item) => {
      if (!credentials[item]) {
        throw new BadRequest({
          message: `O campo ${item} deve ser preenchido`,
          code_error: null,
        });
      }
    });

    this.props = credentials;
  }
}
