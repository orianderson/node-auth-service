import { UserInterface, UserIdentity } from '@domain/types';
import { UserUpdateFields } from './UserUpdateFields';

export abstract class IUserRepository {
  abstract verifyIfUserExist(identity: UserIdentity): Promise<any>;
  abstract create(payload: UserInterface): Promise<any>;
  abstract signInUser(payload: any): Promise<any>;
  abstract verifyUserByIdentity(
    field: string,
    id: any,
    query: any,
  ): Promise<{ id: string } | null>;
  abstract update(
    field: string,
    id: string,
    value: UserUpdateFields,
  ): Promise<void>;
}
