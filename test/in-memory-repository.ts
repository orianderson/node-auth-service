import { UsersRepository } from '../src/app/repositories';
import { UserProps } from '../src/app/types';

export class InMemoryUsersRepository implements UsersRepository {
  public database: UserProps[] = [];

  async create(data: UserProps): Promise<void> {
    this.database.push(data);
  }
}
