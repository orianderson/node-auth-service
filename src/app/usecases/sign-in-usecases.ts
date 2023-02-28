import { IJwtEnvironment } from './../ports/config/IJwtEnvironment';
import { InputCredentials, UserOutput } from './../../domain/interfaces';
import {
  IAuthService,
  IInputAuth,
  IUserRepository,
  ICacheService,
  allowList,
} from '@app/ports';
import { Either, left, right } from '@helpers/either';
import { InvalidCredentialsError } from '../errors';

export class SignInUsecases
  implements IInputAuth<InputCredentials, UserOutput>
{
  private days = 5;
  private oneDayMilliseconds = 86400000;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
    private readonly environment: IJwtEnvironment,
    private readonly cacheService: ICacheService,
  ) {}

  async execute(
    payload: InputCredentials,
  ): Promise<Either<InvalidCredentialsError, UserOutput>> {
    const data = await this.userRepository.get(payload.email);

    if (data) {
      const secret = this.environment.getJwtSecret();
      const user = await this.authService.signInUser(payload.password, secret, {
        email: data.email,
        id: data.id,
        name: data.name,
        password: data.password,
        profile: data.profile,
        username: data.username,
      });
      if (user) {
        await this.cacheService.setKey(allowList(user.id), {
          value: user.refreshToken,
          expiration: Date.now() + this.days * this.oneDayMilliseconds,
        });
        return right(user);
      }
    }

    return left(new InvalidCredentialsError());
  }
}
