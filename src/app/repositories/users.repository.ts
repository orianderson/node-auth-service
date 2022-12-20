import { UserInterface } from '@domain/types';

export abstract class IUsersRepository {
  abstract signInUser(identity: string): Promise<UserInterface>;
  abstract verifyUserByIdentity(identity: {
    type: string;
    id: string;
  }): Promise<{ userId: string } | null>;
}
