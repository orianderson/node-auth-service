import { UserInterface } from '@domain/types';
import { RegisterUserUsecases } from '@app/index';
import { IUserRepository, IBcryptService } from '@interfaces/index';
import { makeRegisterUserUsecases } from '../factory';

export class RegisterUserAdapter {
  registerUserUsecases: RegisterUserUsecases;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {
    this.registerUserUsecases = makeRegisterUserUsecases(
      this.bcryptService,
      this.userRepository,
    );
  }

  async create(payload: UserInterface) {
    const user = await this.registerUserUsecases.execute(payload);

    return user;
  }
}
