import { randomUUID } from 'crypto';

import { Replace } from '../../helpers';
import { Email, Phone } from './';

export interface UserProps {
  id: string;
  name: string;
  job: string;
  email: string;
  phone: string;
  whatsapp: string;
  state: string;
  city?: string;
  picture?: string;
  created_at: Date;
}

export class User {
  private props: UserProps;

  constructor(user: Replace<UserProps, { created_at?: Date; id?: string }>) {
    this.props = this.validate({
      ...user,
      created_at: user.created_at ?? new Date(),
      id: user.id ?? randomUUID(),
    });
  }

  private validate(user: UserProps): UserProps {
    const phone = new Phone(user.phone);
    new Email(user.email);

    user.phone = phone.value;

    this.verifyFields(user);

    return user;
  }

  private verifyFields(user: UserProps) {
    const fields = [
      'id',
      'name',
      'job',
      'email',
      'phone',
      'whatsapp',
      'state',
      'city',
      'created_at',
    ];

    fields.forEach((item) => {
      if (!user[item]) {
        throw new Error('Todos os campos devem ser preenchidos');
      }
    });
  }

  public set user(user: UserProps) {
    this.props = user;
  }

  public get user(): UserProps {
    return this.props;
  }
}
