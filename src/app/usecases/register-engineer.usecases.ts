import { EngineerInterface } from '../../domain/types';
import { Engineer, Email, Phone } from '../../domain/entities';
import { IEngineerRepository } from '../repositories';
import { IBcryptService } from '../adapters';

import { ConflictException } from '@helpers/exceptions';

export class RegisterEngineerUsecases {
  constructor(
    private readonly engineerRepository: IEngineerRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(body: EngineerInterface): Promise<EngineerInterface> {
    const isUser = await this.engineerRepository.verifyIfUserExist(body.email);

    if (isUser) {
      throw new ConflictException({
        message: 'User already exist.',
        code_error: null,
      });
    }

    new Email(body.email);

    const { phoneNumber } = new Phone(body.phone);

    const { engineer } = new Engineer(body);

    const hashPassword = await this.bcryptService.hash(engineer.password);

    await this.engineerRepository.create({
      ...engineer,
      phone: phoneNumber,
      password: hashPassword,
    });

    return engineer;
  }
}
