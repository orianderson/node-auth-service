import { UsersRepository } from '@app/repositories';
import { UserAuth } from '@app/model';
import { AuthCredentials } from '../entities';

export class LoginUseCases {
  constructor(private readonly userRepository: UsersRepository) {}
  async signUser(payload: UserAuth) {
    const { email } = new AuthCredentials(payload).value;

    const user = await this.userRepository.signUser(email);

    return user;
  }
}
