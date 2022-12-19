import { IJwtPayload } from './IJwtPayload';

export interface IRefreshTokenService {
  checkRefreshToken(refreshToken: string): Promise<boolean>;
  createRefreshToken(payload: IJwtPayload): string;
}
