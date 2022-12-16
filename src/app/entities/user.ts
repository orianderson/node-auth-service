import { randomUUID } from 'crypto';

import { Replace } from '../../helpers';
import { Email, Phone } from './';
import { UserModel } from '@app/model';

export class User {
  private props: UserModel;

  constructor(user: Replace<UserModel, { created_at?: Date; id?: string }>) {
    this.props = this.validate({
      ...user,
      created_at: user.created_at ?? new Date(),
      id: user.id ?? randomUUID(),
    });
  }

  private validate(user: UserModel): UserModel {
    const phone = new Phone(user.phone);
    new Email(user.email);

    user.phone = phone.value;

    this.verifyFields(user);

    return user;
  }

  private verifyFields(user: UserModel) {
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
      'password',
    ];

    fields.forEach((item) => {
      if (!user[item]) {
        throw new Error('Todos os campos devem ser preenchidos');
      }
    });
  }

  public set user(user: UserModel) {
    this.props = user;
  }

  public get user(): UserModel {
    return this.props;
  }
}
