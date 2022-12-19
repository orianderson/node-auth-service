import { RegisterEngineerUsecases } from '@app/usecases';
import { IEngineerRepository } from '@app/repositories';
import { IBcryptService } from '@app/adapters';

export const engineerControllerFactory = (
  engineerRepository: IEngineerRepository,
  bcryptService: IBcryptService,
) => {
  return new RegisterEngineerUsecases(engineerRepository, bcryptService);
};
