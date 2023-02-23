import { UserInput } from '@domain/interfaces';

export abstract class IUserRepository {
  abstract create(user: UserInput): Promise<void>;
  abstract verifyUser(user: {
    email: string;
    username: string;
  }): Promise<boolean>;
}
