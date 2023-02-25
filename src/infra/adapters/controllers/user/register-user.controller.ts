import { BodyCreateUser, ResponseCreatedUser } from '../dto';
import { UsecasesFactory } from '../../factory';

export class UserControllers {
  usecases: UsecasesFactory;

  constructor() {
    this.usecases = new UsecasesFactory();
  }

  async create(payload: BodyCreateUser): Promise<ResponseCreatedUser> {
    const user = await this.usecases.registerUser().execute(payload);
    return {
      id: user.id,
    };
  }
}
