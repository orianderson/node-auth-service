import { UserProps } from '@app/model';

export class UserViewModel {
  static toHttpResponse(user: UserProps) {
    return {
      id: user.id,
      name: user.name,
      job: user.job,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      state: user.state,
      city: user.city,
    };
  }
}
