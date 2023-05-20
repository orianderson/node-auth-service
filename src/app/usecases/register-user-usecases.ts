import { User } from '../../domain/entities/user';
import { IBcryptService, IInputPort, IUserRepository } from '@app/ports';
import { NewUser, UserCreated } from '../../domain/interfaces';

import {
  BadRequestException,
  StatusResponse,
  ConflictException,
} from '../../helpers';

export class RegisterUserUsecases implements IInputPort<NewUser, UserCreated> {
  constructor(
    private readonly bcrypt: IBcryptService,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(newUser: NewUser): Promise<UserCreated> {
    const userObj = User.create(newUser);

    if (userObj.isRight()) {
      const user = User.toJsonFormat(userObj.value);

      const isUser = await this.userRepository.isUser({
        email: user.email,
      });

      await this.createUser(isUser, user);

      return { id: newUser.id };
    } else {
      throw new BadRequestException({
        code_error: StatusResponse.BAD_REQUEST.statusCode.toString(),
        message: userObj.value.message,
      });
    }
  }

  private async createUser(isUser: boolean, user: NewUser) {
    if (isUser) {
      throw new ConflictException({
        code_error: null,
        message: 'User already exist',
      });
    } else {
      user.password = await this.bcrypt.hash(user.password);

      await this.userRepository.create(user);
    }
  }
}
