import { InputCredentials, UserOutput } from './../../domain/interfaces';
import { IAuthService, IInputAuth, IUserRepository } from '@app/ports';
import { Either, left, right } from '@helpers/either';
import { InvalidCredentialsError } from '../errors';

export class SignInUsecases
  implements IInputAuth<InputCredentials, UserOutput>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(
    payload: InputCredentials,
  ): Promise<Either<InvalidCredentialsError, UserOutput>> {
    const data = await this.userRepository.get(payload.email);

    if (data) {
      const user = await this.authService.signInUser(
        payload.password,
        'secret',
        {
          email: data.email,
          id: data.id,
          name: data.name,
          password: data.password,
          profile: data.profile,
          username: data.username,
        },
      );
      if (user) {
        return right(user);
      }
    }

    return left(new InvalidCredentialsError());
  }
}
