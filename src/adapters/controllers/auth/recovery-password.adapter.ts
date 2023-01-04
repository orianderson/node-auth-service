import { makeRecoveryPasswordUsecases } from './../../factory/authentication.factory';
import {
  IUserRepository,
  IBcryptService,
  IAuthTokenService,
} from '@interfaces/index';
import { RecoveryPasswordUsecases } from '@app/usecases';

export class RecoveryPasswordAdapter {
  recoveryPasswordUsecases: RecoveryPasswordUsecases;
  constructor(
    private readonly useRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {
    this.recoveryPasswordUsecases = makeRecoveryPasswordUsecases(
      this.useRepository,
      this.bcryptService,
    );
  }

  async update(id: string, password: string) {
    await this.recoveryPasswordUsecases.updatePassword(id, password);
  }
}
