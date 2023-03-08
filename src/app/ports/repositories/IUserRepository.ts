import {
  NewUser,
  UserData,
  UserIdentity,
  UserUpdate,
} from '@domain/interfaces';

export abstract class IUserRepository {
  abstract create(user: NewUser): Promise<void>;
  abstract isUser(user: UserIdentity): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
  abstract get(id: string): Promise<UserData>;
  abstract update(query: UserUpdate): Promise<any>;
}
