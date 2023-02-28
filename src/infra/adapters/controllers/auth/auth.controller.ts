import { UsecasesFactory } from '../../factory/UsecasesFactory';
import { BodyCredentials, ResponseSignIn, BodyIdentityUser } from '../dto';

export class AuthControllers {
  constructor(private readonly usecases: UsecasesFactory) {}

  async signIn(payload: BodyCredentials): Promise<ResponseSignIn> {
    const user = await this.usecases.signIn().execute(payload);

    if (user.isRight()) {
      return user.value;
    }
  }

  async isUser(payload: BodyIdentityUser): Promise<void> {
    const user = await this.usecases.isUser().execute(payload);

    if (user.isLeft()) {
      throw new Error();
    }
  }
}
