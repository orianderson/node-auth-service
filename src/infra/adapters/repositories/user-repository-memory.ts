import { InputCreateUser, UserData } from '@domain/interfaces';
import { IUserRepository } from '@app/ports';

export class UserRepositoryMemory implements IUserRepository {
  data: InputCreateUser[];

  constructor() {
    this.data = [];
  }

  async get(id: string): Promise<UserData> {
    throw new Error('Method not implemented.');
  }

  async create(user: InputCreateUser): Promise<void> {
    this.data.push(user);
  }

  async isUser(user: { email: string; username: string }): Promise<boolean> {
    const data = this.data[0];

    if (user.email === data?.email || user.username === data?.username) {
      return true;
    } else {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    this.data.pop();
  }
}
