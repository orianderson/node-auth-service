import { InputCreateUser, UserData, UserIdentity } from '@domain/interfaces';

export abstract class IUserRepository {
  abstract create(user: InputCreateUser): Promise<void>;
  abstract isUser(user: UserIdentity): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
  abstract get(id: string): Promise<UserData>;
  abstract update(data: any): Promise<any>;
}
