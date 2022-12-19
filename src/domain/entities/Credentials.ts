import { ICredentials } from '../types';

export class Credentials {
  private props: ICredentials;

  constructor(credentials: ICredentials) {
    this.props = credentials;
    this.verifyIfFieldsIsEmpty(credentials);
  }

  get credentials(): ICredentials {
    return this.props;
  }

  private verifyIfFieldsIsEmpty(credentials: ICredentials) {
    const fields = ['email', 'password'];

    fields.forEach((item) => {
      if (!credentials[item]) {
        this.props = null;
      }
    });
  }
}
