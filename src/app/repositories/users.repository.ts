import { UserInterface } from '@domain/types';

export abstract class IUsersRepository {
  abstract signInUser(identity: string): Promise<UserInterface>;
  abstract verifyUserById(id: string): Promise<{ id: string } | null>;
}