import { UserInput } from '@domain/interfaces';
import { IUserRepository } from '../../app/ports';

export class UserRepositoryMemory implements IUserRepository {
  data: UserInput[];

  constructor() {
    this.data = [];
  }

  async create(user: UserInput): Promise<void> {
    this.data.push(user);
  }

  async verifyUser(user: {
    email: string;
    username: string;
  }): Promise<boolean> {
    const data = this.data[0];

    if (user.email === data?.email || user.username === data?.username) {
      return true;
    } else {
      return false;
    }
  }
}
