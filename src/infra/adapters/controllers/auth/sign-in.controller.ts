import { UsecasesFactory } from './../../factory/UsecasesFactory';
import { BodyCredentials, ResponseSignIn } from '../dto';

export class AuthControllers {
  usecases: UsecasesFactory;
  constructor() {
    this.usecases = new UsecasesFactory();
  }

  async signIn(payload: BodyCredentials): Promise<ResponseSignIn> {
    const user = await this.usecases.signIn().execute(payload);

    if (user.isRight()) {
      return user.value;
    }
  }
}
