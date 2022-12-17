import { UserModelResponse } from '../dto';

export class UserViewModel {
  static toHttpResponse(user: UserModelResponse): UserModelResponse {
    return {
      id: user.id,
      name: user.name,
      job: user.job,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      state: user.state,
      city: user.city,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }
}
