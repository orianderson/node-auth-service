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

  private handleException() {
    throw new UnauthorizedException({
      code_error: null,
      message: 'Invalid credentials',
    });
  }

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
      this.handleException();
    }

    await this.cacheService.setKey(`user-validation: ${userId.id}`, {
      expiration: 0,
      value: code,
    });

    await this.mailService.sendMail(options);

    return userId;
  }

  async verifyCode(payload: { code: number; id: string }) {
    const key = `user-validation: ${payload.id}`;
    const isValid = await this.cacheService.getKey(key);

    if (!isValid || isValid.value !== payload.code) {
      this.handleException();
    }

    await this.cacheService.delete(key);
  }
}
