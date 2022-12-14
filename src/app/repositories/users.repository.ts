import { UserProps } from '../dto';

export abstract class UsersRepository {
  abstract create(data: UserProps): Promise<void>;
}
