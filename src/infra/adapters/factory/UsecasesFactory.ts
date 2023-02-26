import { BcryptService, authService } from 'bcrypt-jwt-module';

import { RegisterUserUsecases, SignInUsecases } from '@app/usecases';
import { UserRepository } from '@infra/adapters/repositories';

export class UsecasesFactory {
  registerUser(): RegisterUserUsecases {
    return new RegisterUserUsecases(new BcryptService(), new UserRepository());
  }

  signIn(): SignInUsecases {
    return new SignInUsecases(authService);
  }
}
