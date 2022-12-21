import { IEnvironmentConfig } from '@app/config';
import { IMailService } from '@app/adapters';
import { IUsersRepository } from '@app/repositories';
import { VerifyUserUseCases } from '@app/usecases';

export const verifyUserControllerFactory = (
  usersRepository: IUsersRepository,
  mailService: IMailService,
  environmentConfig: IEnvironmentConfig,
) => {
  return new VerifyUserUseCases(
    usersRepository,
    mailService,
    environmentConfig,
  );
};
