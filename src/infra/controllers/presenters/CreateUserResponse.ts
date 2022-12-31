import { UserInterface } from '@domain/types';

export class UserResponse {
  static toHttpResponse(user: UserInterface) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: user?.accessToken,
      refreshToken: user?.refreshToken,
    };
  }
}
