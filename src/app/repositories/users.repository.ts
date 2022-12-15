import { UserModel } from '@app/model';

export abstract class UsersRepository {
  abstract create(data: UserModel): Promise<void>;
}
