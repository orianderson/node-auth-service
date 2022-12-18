import { randomUUID } from 'crypto';
import { EngineerInterface } from '../../../../domain/types';
import { IEngineerMapper } from '../../../../app/repositories';

export class EngineerMapper implements IEngineerMapper {
  create(user: EngineerInterface): EngineerInterface {
    return {
      id: user?.id ?? randomUUID(),
      city: user.city,
      email: user.email,
      job: user.job,
      name: user.name,
      phone: user.phone,
      state: user.state,
      whatsapp: user.whatsapp,
      created_at: user.created_at,
      password: user.password,
    };
  }
}
