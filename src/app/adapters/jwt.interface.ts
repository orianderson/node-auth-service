export interface IJwtServicePayload {
  _id: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<boolean>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
