import { IEncryptionService } from '../ports';
import { UserInput } from '../../domain/interfaces';

export class RegisterUserUsecases {
  constructor(private readonly encryptionService: IEncryptionService) {}
}
