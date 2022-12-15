import { UsersRepository } from '../src/app/repositories';
import { UserProps } from '../src/app/model';

export class InMemoryUsersRepository implements UsersRepository {
  public database: UserProps[] = [];

  async create(data: UserProps): Promise<void> {
    this.database.push(data);
  }
}
