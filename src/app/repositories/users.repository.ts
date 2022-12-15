import { UserProps } from '@app/model';

export abstract class UsersRepository {
  abstract create(data: UserProps): Promise<void>;
}
