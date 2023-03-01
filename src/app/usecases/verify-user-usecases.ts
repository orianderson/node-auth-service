import { Either, left, right } from '@helpers/either';
import { UserIdentity } from '@domain/interfaces';
import { InvalidUserError } from '../errors';
import { IInputUserId, IUserRepository, IMailService } from '@app/ports';
import { generateCode } from '@helpers/index';

export class VerifyUserUsecases implements IInputUserId<UserIdentity, boolean> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
  ) {}

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
      await this.mailService.sendMail({
        subject: 'Código de verificação',
        to: data.email,
        html: code.toString(),
      });

      return right(true);
    }
  }
}
