import { BcryptService } from 'bcrypt-jwt-module';

import { RegisterUserUsecases } from '@app/usecases';
import { UserRepository } from '@app/ports/repositories';

export class UsecasesFactory {
  static createRegisterUserUsecases(): RegisterUserUsecases {
    return new RegisterUserUsecases(new BcryptService(), new UserRepository());
  }
}
