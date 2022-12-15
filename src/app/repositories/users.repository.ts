import { UserProps } from '../types';

export abstract class UsersRepository {
  abstract create(data: UserProps): Promise<void>;
}
