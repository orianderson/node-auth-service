import { Either, left, right } from '@helpers/either';
import {
  InputCode,
  IInputCode,
  ResponseUserVerified,
  IJwtEnvironment,
} from '../ports';
import { NotFoundError } from '../errors';

import { ICacheService, codeList, IJwtService } from '@app/ports';

export class VerifyCodeUsecases
  implements IInputCode<InputCode, ResponseUserVerified>
{
  constructor(
    private readonly cacheService: ICacheService,
    private readonly jwt: IJwtService,
    private readonly environment: IJwtEnvironment,
  ) {}

  async execute(
    data: InputCode,
  ): Promise<Either<NotFoundError, ResponseUserVerified>> {
    const code = await this.cacheService.getKey(codeList(data.email));

    if (!code || code.value !== data.code) {
      return left(new NotFoundError());
    }

    const accessToken = this.jwt.createToken(
      {
        id: data.email,
      },
      {
        expiresIn: '3m',
        secret: this.environment.getJwtSecret(),
      },
    ) as string;

    return right({
      accessToken: accessToken,
    });
  }
}
