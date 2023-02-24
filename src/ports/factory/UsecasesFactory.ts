import { BcryptService } from 'bcrypt-jwt-module';

import { RegisterUserUsecases } from '@app/usecases';
import { UserRepositorySQLite } from '@ports/repositories';

export class UsecasesFactory {
  static createRegisterUserUsecases(): RegisterUserUsecases {
    return new RegisterUserUsecases(
      new BcryptService(),
      new UserRepositorySQLite(),
    );
  }
}
