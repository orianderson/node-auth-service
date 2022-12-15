import { User } from '@app/entities';

export abstract class UsersRepository {
  abstract create(data: User): Promise<void>;
}
