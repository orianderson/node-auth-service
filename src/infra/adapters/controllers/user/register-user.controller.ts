import { BodyCreateUser, ResponseCreatedUser } from '../dto';
import { UsecasesFactory } from '../../factory';
export class RegisterUserController {
  usecases: UsecasesFactory;
  constructor() {
    this.usecases = new UsecasesFactory();
  }

  async create(payload: BodyCreateUser): Promise<ResponseCreatedUser> {
    const user = await this.usecases.create().registerUser.execute(payload);
    return {
      id: user.id,
    };
  }
}
