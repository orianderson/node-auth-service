import { BodyUpdate } from '../dto/user';
import { UserUsecasesFactory } from '../../factory';

export class UpdateUserControllers {
  constructor(private readonly usecases: UserUsecasesFactory) {}

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
