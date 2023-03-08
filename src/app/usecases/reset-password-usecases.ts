import { Either, left, right } from '@helpers/either';
import { IInputPort, IUserRepository, IBcryptService } from '@app/ports';
import { UserData } from '@domain/interfaces';
import { Password } from '@domain/objects';
import { InvalidPasswordError } from '@domain/errors';

export class ResetPasswordUsecases
  implements IInputPort<InvalidPasswordError, boolean>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: IBcryptService,
  ) {}
  async execute(
    data: UserData,
  ): Promise<Either<InvalidPasswordError, boolean>> {
    const isStrong = Password.create(data.password);

    if (isStrong.isRight()) {
      const hashPassword = await this.bcrypt.hash(isStrong.value.password);
      await this.userRepository.update({
        email: data.email,
        data: { password: hashPassword },
      });

      return right(true);
    } else {
      return left(new InvalidPasswordError());
    }
  }
}
