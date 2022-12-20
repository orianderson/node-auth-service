import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';
import { IUsersRepository } from '@app/repositories';

export class VerifyUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async verifyUserByEmail(email: string) {
    const userId = await this.usersRepository.verifyUserByIdentity({
      type: 'email',
      id: email,
    });

    if (!userId) {
      throw new UnauthorizedException({
        code_error: null,
        message: 'Invalid credentials',
      });
    }

    return userId;
  }
}
