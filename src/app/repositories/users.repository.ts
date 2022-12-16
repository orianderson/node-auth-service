import { UserModel } from '@app/model';

export abstract class UsersRepository {
  abstract verifyIfUserExist(email: string): Promise<void>;
  abstract create(data: UserModel): Promise<void>;
  abstract signUser(email: string): Promise<UserModel>;
}
