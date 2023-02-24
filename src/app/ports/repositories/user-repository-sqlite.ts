import { UserInput } from '@domain/interfaces';
import { IUserRepository } from '../interfaces';
import { UserDatabaseService } from '@infra/adapters/database';
import { DatabaseClient } from '@infra/database';

export class UserRepositorySQLite implements IUserRepository {
  userDatabase: UserDatabaseService;

  constructor() {
    this.userDatabase = new UserDatabaseService(new DatabaseClient());
  }

  async isUser(user: { email: string; username: string }): Promise<boolean> {
    return await this.userDatabase.exist(user);
  }

  async create(user: UserInput): Promise<void> {
    await this.userDatabase.create(user);
  }

  async delete(id: string): Promise<void> {
    await this.userDatabase.delete(id);
  }
}
