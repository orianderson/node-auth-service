import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';
import { IBcryptService, IUserRepository } from '@interfaces/index';
import { ICredentials } from '@domain/types';
import { Credentials } from '@domain/valueObjects';

export class LoginUsecases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid credentials',
    });
  }

  async signInUser(payload: ICredentials) {
    const { email, password } = new Credentials(payload).credentials;

    if (!email || !password) {
      this.handleException();
    }

    const user = await this.userRepository.signInUser(payload);

    if (!user) {
      this.handleException();
    }

    const isValid = await this.bcryptService.compare(password, user.password);

    if (!isValid) {
      this.handleException();
    }

    return true;
  }
}
