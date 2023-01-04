import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';
import {
  IUserRepository,
  IMailService,
  ICacheService,
} from '@interfaces/index';
import { EmailToSend } from '@domain/valueObjects';
import { generateCode } from '@helpers/generate-code';

export class VerifyUserUsecases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly cacheService: ICacheService,
  ) {}

  async verifyUserByEmail(email: string) {
    const code = generateCode(6);

    const { options } = new EmailToSend({
      to: email,
      subject: 'Code de verificação',
      html: `${code}`,
    });

    const userId = await this.userRepository.verifyUserByIdentity(
      'email',
      email,
      { id: true },
    );

    if (!userId) {
      throw new UnauthorizedException({
        code_error: null,
        message: 'Invalid credentials',
      });
    }

    await this.cacheService.setKey(`user-validation: ${userId.id}`, {
      expiration: 0,
      value: code,
    });

    await this.mailService.sendMail(options);
  }
}
