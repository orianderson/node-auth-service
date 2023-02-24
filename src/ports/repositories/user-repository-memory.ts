import { UserInput } from '@domain/interfaces';
import { IUserRepository } from '../interfaces';

export class UserRepositoryMemory implements IUserRepository {
  data: UserInput[];

  constructor() {
    this.data = [];
  }

  async create(user: UserInput): Promise<void> {
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