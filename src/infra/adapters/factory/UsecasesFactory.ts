import { BcryptService } from 'bcrypt-jwt-module';

import { RegisterUserUsecases } from '@app/usecases';
import { UserRepository } from '@infra/adapters/repositories';

export class UsecasesFactory {
  registerUser(): RegisterUserUsecases {
    return new RegisterUserUsecases(new BcryptService(), new UserRepository());
  }
}
