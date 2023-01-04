import { UserInterface } from '@domain/types';

export abstract class IUserRepository {
  abstract verifyIfUserExist(identity: string): Promise<any>;
  abstract create(payload: UserInterface): Promise<any>;
  abstract signInUser(payload: any): Promise<any>;
  abstract verifyUserByIdentity(
    field: string,
    id: any,
    query: any,
  ): Promise<{ id: string } | null>;
}
