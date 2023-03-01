import { BcryptService, authService } from 'bcrypt-jwt-module';

import {
  RegisterUserUsecases,
  SignInUsecases,
  VerifyUserUsecases,
  ResetPasswordUsecases,
} from '@app/usecases';
import { UserRepository } from '@infra/adapters/repositories';
import { IUsecasesFactory } from '@app/ports';
import { EnvironmentService } from '../../../config';
import { CacheService, MailService, MailTransporter } from '@infra/index';

export class UserUsecasesFactory implements IUsecasesFactory {
  registerUser(): RegisterUserUsecases {
    return new RegisterUserUsecases(new BcryptService(), new UserRepository());
  }

  signIn(): SignInUsecases {
    return new SignInUsecases(
      new UserRepository(),
      authService,
      new EnvironmentService(),
      new CacheService(),
    );
  }

  isUser(): VerifyUserUsecases {
    return new VerifyUserUsecases(
      new UserRepository(),
      new MailService(new MailTransporter()),
    );
  }

  resetPassword(): ResetPasswordUsecases {
    return new ResetPasswordUsecases(new UserRepository(), new BcryptService());
  }
}