import { IBcryptService } from './../adapters/bcrypt.interface';
import { UsersRepository } from '@app/repositories';
import { UserAuth } from '@app/model';
import { AuthCredentials } from '@app/entities';
import { UnauthorizedInterface } from '@app/exceptions';

const handleCredentialsErrors = () => {
  throw new UnauthorizedInterface({
    code_error: null,
    message: 'Unrecognized credentials',
  });
};

export class LoginUseCases {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly bcryptService: IBcryptService,
  ) {}
  async signUser(payload: UserAuth) {
    const { email, password } = new AuthCredentials(payload).value;
    const user = await this.userRepository.signUser(email);

    if (!user) {
      handleCredentialsErrors();
    }

    const isValid = await this.bcryptService.compare(password, user.password);

    if (!isValid) {
      handleCredentialsErrors();
    }

    return user;
  }
}
