import { UsersRepository } from '../src/app/repositories';
import { UserModel } from '../src/app/model';

export class InMemoryUsersRepository implements UsersRepository {
  public database: UserModel[] = [];

  async create(data: UserModel): Promise<void> {
    this.database.push(data);
  }
}
