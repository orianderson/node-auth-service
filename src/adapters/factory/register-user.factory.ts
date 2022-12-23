import { IBcryptService, IUserRepository } from '@interfaces/index';
import { RegisterUserUsecases } from '@app/index';

export const makeRegisterUserUsecases = (
  bcryptService: IBcryptService,
  userRepository: IUserRepository,
) => {
  return new RegisterUserUsecases(bcryptService, userRepository);
};
