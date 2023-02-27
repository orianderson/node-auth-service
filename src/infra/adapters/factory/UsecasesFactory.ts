import { BcryptService, authService } from 'bcrypt-jwt-module';

import {
  RegisterUserUsecases,
  SignInUsecases,
  VerifyUserUsecases,
  ResetPasswordUsecases,
} from '@app/usecases';
import { UserRepository } from '@infra/adapters/repositories';

export class UsecasesFactory {
  registerUser(): RegisterUserUsecases {
    return new RegisterUserUsecases(new BcryptService(), new UserRepository());
  }

  signIn(): SignInUsecases {
    return new SignInUsecases(new UserRepository(), authService);
  }

  isUser(): VerifyUserUsecases {
    return new VerifyUserUsecases(new UserRepository());
  }

  resetPassword(): ResetPasswordUsecases {
    return new ResetPasswordUsecases(new UserRepository(), new BcryptService());
  }
}
