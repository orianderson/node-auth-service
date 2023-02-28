import { Either, left, right } from '@helpers/either';
import { UserIdentity } from '@domain/interfaces';
import { InvalidUserError } from '../errors';
import { IInputUserId, IUserRepository } from '@app/ports';
import { generateCode } from '@helpers/index';

export class VerifyUserUsecases implements IInputUserId<UserIdentity, boolean> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: UserIdentity,
  ): Promise<Either<InvalidUserError, boolean>> {
    const isUser = await this.userRepository.isUser({
      email: data.email,
    });

    if (!isUser) {
      return left(new InvalidUserError());
    } else {
      const code = generateCode(6);
      console.log(code);
      return right(true);
    }
  }
}
