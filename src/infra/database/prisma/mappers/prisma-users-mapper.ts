import { UserProps } from '@app/interfaces';

export class PrismaUsersMappers {
  static registerMapper(user: UserProps) {
    return {
      id: user.id,
      city: user.city,
      email: user.email,
      job: user.job,
      name: user.name,
      phone: user.phone,
      state: user.state,
      whatsapp: user.whatsapp,
      created_at: user.created_at,
    };
  }
}
