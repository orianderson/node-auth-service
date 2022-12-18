import { EngineerResponse } from './UserResponse';

export class ResponseEngineer {
  static toHttpResponse(user: EngineerResponse): EngineerResponse {
    return {
      id: user.id,
      name: user.name,
      job: user.job,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      state: user.state,
      city: user.city,
      picture: user?.picture,
      accessToken: user?.accessToken,
      refreshToken: user.refreshToken,
    };
  }
}
