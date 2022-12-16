import { UserModel } from '@app/model';
import { User } from '../entities';
import { UsersRepository } from '../repositories';
import { IBcryptService } from '../adapters';

export class RegisterUser {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(data: UserModel): Promise<UserModel> {
    const newUser = new User(data);

    const { user } = newUser;

    const hashPassword = await this.bcryptService.hash(user.password);

    user.password = hashPassword;

    await this.userRepository.create(user);

    return user;
  }
}
