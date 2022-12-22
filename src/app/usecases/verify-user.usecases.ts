import { ICacheService } from '@app/cache';
import { UnauthorizedException } from '../../helpers/exceptions/Unauthorized';
import { IUsersRepository } from '@app/repositories';
import { IMailService } from '@app/adapters';
import { generateCode } from '@helpers/generate-code';
import { IEnvironmentConfig } from '@app/config/IEnvironmentConfig';
import { EmailToSend } from '@domain/entities';

export class VerifyUserUseCases {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly mailService: IMailService,
    private readonly environmentConfig: IEnvironmentConfig,
    private readonly cacheService: ICacheService,
  ) {}

  async verifyUserByEmail(email: string) {
    const code = generateCode(6);

    const { options } = new EmailToSend({
      to: email,
      from: this.environmentConfig.getEmailUser(),
      subject: 'Code de verificação',
      html: `${code}`,
    });

    const userId = await this.usersRepository.verifyUserByIdentity({
      type: 'email',
      id: email,
    });

    if (!userId) {
      throw new UnauthorizedException({
        code_error: null,
        message: 'Invalid credentials',
      });
    }

    await this.cacheService.create({
      key: userId.id,
      value: code,
    });

    const res = await this.cacheService.get(userId.id);

    console.log(res);

    await this.mailService.sendEmail(options);

    return userId;
  }
}
