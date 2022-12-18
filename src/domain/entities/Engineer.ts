import { UserEntity } from './UserEntity';
import { EngineerInterface } from './../types/EngineerInterface';
import { fieldsToVerifyEngineer } from './constants';

export class Engineer extends UserEntity<EngineerInterface> {
  private baseUser: EngineerInterface;

  constructor(user: EngineerInterface) {
    super(user, fieldsToVerifyEngineer);

    this.baseUser = {
      ...user,
      created_at: user.created_at ?? new Date(),
    };
  }

  public get engineer(): EngineerInterface {
    return this.baseUser;
  }
}
