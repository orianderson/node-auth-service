import { NewUser, UserData, UserUpdate } from '@domain/interfaces';
import { IUserRepository } from '@app/ports';

export class UserRepositoryMemory implements IUserRepository {
  data: NewUser[];

  constructor() {
    this.data = [];
  }

  async get(id: string): Promise<UserData> {
    throw new Error('Method not implemented.');
  }

  async create(user: NewUser): Promise<void> {
    this.data.push(user);
  }

  async isUser(user: { email: string }): Promise<boolean> {
    const data = this.data[0];

    if (user.email === data?.email) {
      return true;
    } else {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    this.data.pop();
  }

  async update(data: UserUpdate): Promise<any> {
    console.log(data);
  }
}
