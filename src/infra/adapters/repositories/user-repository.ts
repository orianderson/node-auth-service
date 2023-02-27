import { InputCreateUser, UserData } from '@domain/interfaces';
import { IUserRepository } from '@app/ports/repositories';
import { UserDatabaseService } from '@infra/adapters/database';
import { DatabaseClient } from '@infra/database';

export class UserRepository implements IUserRepository {
  userDatabase: UserDatabaseService;

  constructor() {
    this.userDatabase = new UserDatabaseService(new DatabaseClient());
  }

  async isUser(user: { email: string; username: string }): Promise<boolean> {
    return await this.userDatabase.exist(user);
  }

  async create(user: InputCreateUser): Promise<void> {
    await this.userDatabase.create(user);
  }

  async delete(id: string): Promise<void> {
    await this.userDatabase.delete(id);
  }

  async get(id: string): Promise<UserData | null> {
    const userData = await this.userDatabase.get({
      email: id,
      data: {
        email: true,
        id: true,
        name: true,
        password: true,
        profile: true,
        username: true,
      },
    });

    return userData;
  }

  async update(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
