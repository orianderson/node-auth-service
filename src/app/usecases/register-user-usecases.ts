import { User } from './../../domain/entities/user';
import { IBcryptService } from '../ports';
import { UserInput } from '../../domain/interfaces';

import { BadRequestException, StatusResponse } from '../../helpers';

export class RegisterUserUsecases {
  constructor(private readonly bcrypt: IBcryptService) {}

  async create(newUser: UserInput): Promise<{ id: string }> {
    const userObj = User.create(newUser);

    if (userObj.isRight()) {
      const user = User.toJsonFormat(userObj.value);

      user.password = await this.bcrypt.hash(user.password);

      return { id: newUser.id };
    } else {
      throw new BadRequestException({
        code_error: StatusResponse.BAD_REQUEST.statusCode.toString(),
        message: userObj.value.message,
      });
    }
  }
}
