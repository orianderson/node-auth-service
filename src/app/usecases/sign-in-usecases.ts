import { InputCredentials, UserOutput } from './../../domain/interfaces';
import { IAuthService, IInputAuth } from '@app/ports';
import { Either, left, right } from '@helpers/either';
import { InvalidCredentialsError } from '../errors';

export class SignInUsecases
  implements IInputAuth<InputCredentials, UserOutput>
{
  constructor(private readonly authService: IAuthService) {}

  async execute(
    password: string,
    data: InputCredentials,
  ): Promise<Either<InvalidCredentialsError, UserOutput>> {
    const user = await this.authService.signInUser(password, 'secret', data);

    if (user) {
      return right(user);
    } else {
      return left(new InvalidCredentialsError());
    }
  }
}
