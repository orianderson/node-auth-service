import { UsersRepository } from '../src/app/repositories';
import { UserModel } from '../src/app/model';

export class InMemoryUsersRepository implements UsersRepository {
  public database: UserModel[] = [];

  async verifyIfUserExist(email: string): Promise<void> {
    if (this.database[0].email !== email) {
      throw new Error();
    }
  }

  async create(data: UserModel): Promise<void> {
    this.database.push(data);
  }

  async signUser(email: string): Promise<UserModel> {
    console.log(email);
    return this.database[0];
  }
}
