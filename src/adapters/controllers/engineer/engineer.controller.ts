import { RegisterEngineerUsecases } from '@app/usecases';
import { engineerControllerFactory } from '@adapters/factory';
import { EngineerInterface } from '@domain/types';
import { IBcryptService } from '@app/adapters';
import { IEngineerRepository } from '@app/repositories';

export class EngineerControllerAdapter {
  registerEngineerUsecases: RegisterEngineerUsecases;
  constructor(
    private readonly engineerRepository: IEngineerRepository,
    private readonly bcryptService: IBcryptService,
  ) {
    this.registerEngineerUsecases = engineerControllerFactory(
      this.engineerRepository,
      this.bcryptService,
    );
  }

  async create(payload: EngineerInterface) {
    const engineer = await this.registerEngineerUsecases.execute(payload);

    return engineer;
  }
}
