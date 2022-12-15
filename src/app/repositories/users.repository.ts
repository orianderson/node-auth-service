import { UserProps } from '@app/interfaces';

export abstract class UsersRepository {
  abstract create(data: UserProps): Promise<void>;
}
