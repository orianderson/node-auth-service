import { UnauthorizedException } from './../../helpers/exceptions/Unauthorized';
import {
  IUserRepository,
  IMailService,
  ICacheService,
  IAuthTokenService,
} from '@interfaces/index';
import { EmailToSend } from '@domain/valueObjects';
import { generateCode } from '@helpers/generate-code';

export class VerifyUserUsecases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly cacheService: ICacheService,
    private readonly authTokenService: IAuthTokenService,
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

    const token = this.authTokenService.createToken({
      _id: userId.id,
      type: null,
    });

    await this.mailService.sendMail(options);

    return {
      id: token,
    };
  }

  async verifyCode(payload: { code: number; id: string }): Promise<string> {
    const key = `user-validation: ${payload.id}`;
    const isValid = await this.cacheService.getKey(key);

    if (!isValid || isValid.value !== payload.code) {
      this.handleException();
    }

    const token = this.authTokenService.createToken({
      _id: payload.id,
      type: null,
    });

    await this.cacheService.delete(key);

    return token;
  }
}
