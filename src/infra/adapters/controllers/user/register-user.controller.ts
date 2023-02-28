import { BodyCreateUser, ResponseCreatedUser } from '../dto';
import { UsecasesFactory } from '../../factory';

export class UserControllers {
  constructor(private readonly usecases: UsecasesFactory) {}

  async create(payload: BodyCreateUser): Promise<ResponseCreatedUser> {
    const user = await this.usecases.registerUser().execute(payload);
    return {
      id: user.id,
    };
  }
}
