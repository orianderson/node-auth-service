import { InputCreateUser, UserData } from '@domain/interfaces';

export abstract class IUserRepository {
  abstract create(user: InputCreateUser): Promise<void>;
  abstract isUser(user: { email: string; username: string }): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
  abstract get(id: string): Promise<UserData>;
}
