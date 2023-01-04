import {
  IUserRepository,
  IBcryptService,
  IAuthTokenService,
} from '@interfaces/index';

export class RecoveryPasswordUsecases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async updatePassword(identity: string, password: string) {
    const hashPassword = await this.bcryptService.hash(password);

    await this.userRepository.update('id', identity, {
      password: hashPassword,
    });
  }
}
