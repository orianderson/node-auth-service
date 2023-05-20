import { blockList } from './../ports/cache/ICacheService';
import { IJwtEnvironment } from './../ports/config/IJwtEnvironment';
import {
  Credentials,
  UserData,
  UserOutput,
  Payload,
} from './../../domain/interfaces';
import {
  IAuthService,
  IInputPort,
  IUserRepository,
  ICacheService,
  allowList,
} from '@app/ports';
import { Either, left, right } from '@helpers/either';
import { InvalidCredentialsError } from '../errors';

export class SignInUsecases implements IInputPort<Credentials, UserOutput> {
  private days = 5;
  private oneDayMilliseconds = 86400000;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService<Payload>,
    private readonly environment: IJwtEnvironment,
    private readonly cacheService: ICacheService,
  ) {}

  async execute(
    payload: Credentials,
  ): Promise<Either<InvalidCredentialsError, UserOutput>> {
    const data = await this.userRepository.get(payload.email);

    if (data) {
      const secret = this.environment.getJwtSecret();

      const user = await this.getUserData(payload, secret, data);

      if (user) {
        await this.authenticatedUsersList(user);

        return right(user);
      }
    }

    return left(new InvalidCredentialsError());
  }

  private async authenticatedUsersList(user: UserOutput) {
    await this.cacheService.setKey(allowList(user.id), {
      value: user.refreshToken,
      expiration: Date.now() + this.days * this.oneDayMilliseconds,
    });

    await this.cacheService.delete(blockList(user.id));
  }

  private async getUserData(
    payload: Credentials,
    secret: string,
    data: UserData,
  ) {
    return await this.authService.signInUser(payload.password, secret, {
      email: data.email,
      id: data.id,
      name: data.name,
      password: data.password,
      profile: data.profile,
      active: data.active,
    });
  }
}
