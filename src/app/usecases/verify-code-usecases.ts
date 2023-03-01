import { Either, left, right } from '@helpers/either';
import { InputCode, IInputCode } from '../ports';
import { NotFoundError } from '../errors';

import { ICacheService, codeList } from '@app/ports';

export class VerifyCodeUsecases implements IInputCode<InputCode, boolean> {
  constructor(private readonly cacheService: ICacheService) {}

  async execute(data: InputCode): Promise<Either<NotFoundError, boolean>> {
    const code = await this.cacheService.getKey(codeList(data.email));

    if (!code || code.value !== data.code) {
      return left(new NotFoundError());
    }

    return right(true);
  }
}
