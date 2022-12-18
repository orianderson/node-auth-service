import { EngineerInterface } from '../../domain/types';
import { Engineer, Email, Phone } from '../../domain/entities';
import { IEngineerRepository } from '../repositories';
import { IBcryptService } from '../adapters';

export class RegisterEngineerUsecases {
  constructor(
    private readonly engineerRepository: IEngineerRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(body: EngineerInterface): Promise<EngineerInterface> {
    new Email(body.email);

    const { phoneNumber } = new Phone(body.phone);

    const { engineer } = new Engineer(body);

    const hashPassword = await this.bcryptService.hash(engineer.password);

    engineer.password = hashPassword;

    await this.engineerRepository.create({
      ...engineer,
      phone: phoneNumber,
    });

    return engineer;
  }
}
