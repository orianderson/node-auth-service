import { IJwtService } from 'bcrypt-jwt-module';

import { Either, right, left } from '@helpers/either';
import { IInputPort, IJwtEnvironment, UserId } from '../ports';
import { InvalidCredentialsError } from '../errors';

export class CheckCredentialsUsecases implements IInputPort<string, UserId> {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly environment: IJwtEnvironment,
  ) {}

  async execute(
    accessToken: string,
  ): Promise<UserId | Either<InvalidCredentialsError, UserId>> {
    const userId = this.jwtService.checkToken(
      accessToken,
      this.environment.getJwtSecret(),
    );

    if (userId.isLeft()) return left(new InvalidCredentialsError());

    return right({
      id: userId.value.id,
      role: userId.value.role,
    });
  }
}
