import { ConflictException } from '@helpers/exceptions';
import { User } from '@domain/entities';
import { UserInterface } from '@domain/types';
import { IBcryptService, IUserRepository } from '@interfaces/index';

export class RegisterUserUsecases {
  constructor(
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(body: UserInterface): Promise<{ userId: string }> {
    const userObj = new User(body);
    const email = userObj.user.email.value;

    const isUser = await this.userRepository.verifyIfUserExist({
      email: email,
      username: userObj.user.username,
    });

    if (isUser) {
      throw new ConflictException({
        code_error: null,
        message: 'User already exists.',
      });
    }

    const password = userObj.user.password;

    const hashPassword = await this.bcryptService.hash(password);

    const userId = await this.userRepository.create({
      ...userObj.toJsonObjectFormat(),
      password: hashPassword,
    });

    return userId;
  }
}
