export interface IJwtPayload {
  _id: string;
  type?: 'accessToken' | 'refreshToken';
}
