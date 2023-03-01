import { Either, left, right } from '@helpers/either';
import { UserIdentity } from '@domain/interfaces';
import { InvalidUserError } from '../errors';
import {
  IInputUserId,
  IUserRepository,
  IMailService,
  ICacheService,
  codeList,
  IJwtService,
  IJwtEnvironment,
} from '@app/ports';
import { generateCode } from '@helpers/index';

export class VerifyUserUsecases implements IInputUserId<UserIdentity, string> {
  private minutes = 3;
  private seconds = 60000;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly cacheService: ICacheService,
    private readonly jwt: IJwtService,
    private environment: IJwtEnvironment,
  ) {}

  async execute(data: UserIdentity): Promise<Either<InvalidUserError, string>> {
    const isUser = await this.userRepository.isUser({
      email: data.email,
    });

    if (!isUser) {
      return left(new InvalidUserError());
    } else {
      const code = generateCode(6);

      await this.saveCodeToVerify(data, code);

      await this.mailService.sendMail({
        subject: 'Código de verificação',
        to: data.email,
        html: code.toString(),
      });

      const accessToken = this.jwt.createToken(
        { id: data.email },
        {
          expiresIn: '3m',
          secret: this.environment.getJwtSecret(),
        },
      ) as string;

      return right(accessToken);
    }
  }

  private async saveCodeToVerify(data: UserIdentity, code: number) {
    await this.cacheService.setKey(codeList(data.email), {
      value: code,
      expiration: Date.now() + this.minutes * this.seconds,
    });
  }
}
