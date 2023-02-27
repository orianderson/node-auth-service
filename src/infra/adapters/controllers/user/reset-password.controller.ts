import { BodyUpdate } from '../dto/user';
import { UsecasesFactory } from '../../factory/UsecasesFactory';

export class UpdateUserControllers {
  usecases: UsecasesFactory;

  constructor() {
    this.usecases = new UsecasesFactory();
  }

  async updatePassword(payload: BodyUpdate): Promise<void> {
    const check = await this.usecases.resetPassword().execute({
      id: payload.id,
      password: payload.password,
    });

    if (check.isLeft()) {
      throw new Error();
    }
  }
}
