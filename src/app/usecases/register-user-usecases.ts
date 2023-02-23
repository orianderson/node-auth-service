import { User } from './../../domain/entities/user';
import { IBcryptService, IUserRepository } from '../ports';
import { UserInput } from '../../domain/interfaces';

import {
  BadRequestException,
  StatusResponse,
  ConflictException,
} from '../../helpers';

export class RegisterUserUsecases {
  constructor(
    private readonly bcrypt: IBcryptService,
    private readonly userRepository: IUserRepository,
  ) {}

  async create(newUser: UserInput): Promise<{ id: string }> {
    const userObj = User.create(newUser);

    if (userObj.isRight()) {
      const user = User.toJsonFormat(userObj.value);

      const isUser = await this.userRepository.verifyUser({
        email: user.email,
        username: user.username,
      });

      if (isUser) {
        throw new ConflictException({
          code_error: null,
          message: 'User already exist',
        });
      } else {
        user.password = await this.bcrypt.hash(user.password);

        await this.userRepository.create(user);
      }

      return { id: newUser.id };
    } else {
      throw new BadRequestException({
        code_error: StatusResponse.BAD_REQUEST.statusCode.toString(),
        message: userObj.value.message,
      });
    }
  }
}
