import { Entity } from './UserEntity';
import { Email, Phone } from './values';
import { EngineerInterface } from './../types/EngineerInterface';
import { fieldsToVerifyEngineer } from './constants';

export class Engineer extends Entity<EngineerInterface> {
  private baseUser: EngineerInterface;

  constructor(user: EngineerInterface) {
    super(user, fieldsToVerifyEngineer);

    const { phoneNumber } = new Phone(user.phone);

    new Email(user.email);

    this.baseUser = {
      ...user,
      phone: phoneNumber,
      created_at: user.created_at ?? new Date(),
    };
  }

  public get engineer(): EngineerInterface {
    return this.baseUser;
  }
}
