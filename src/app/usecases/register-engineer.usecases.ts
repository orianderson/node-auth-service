import { EngineerInterface } from '../../domain/types';
import { Engineer } from '../../domain/entities';
import { IEngineerRepository } from '../repositories';
import { IBcryptService } from '../adapters';

export class RegisterEngineerUsecases {
  constructor(
    private readonly engineerRepository: IEngineerRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(body: EngineerInterface): Promise<EngineerInterface> {
    const { engineer } = new Engineer(body);

    const hashPassword = await this.bcryptService.hash(engineer.password);

    engineer.password = hashPassword;

    await this.engineerRepository.create(engineer);

    return engineer;
  }
}
