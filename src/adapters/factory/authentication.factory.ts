import { LoginUsecases } from '@app/usecases';

import { IUserRepository, IBcryptService } from '@interfaces/index';

export const makeLoginUsecases = (
  userRepository: IUserRepository,
  bcryptService: IBcryptService,
) => {
  return new LoginUsecases(userRepository, bcryptService);
};
