import { IJwtPayload } from './IJwtPayload';

export abstract class IRefreshTokenService {
  abstract checkRefreshToken(refreshToken: string): Promise<boolean>;
  abstract createRefreshToken(payload: IJwtPayload): string;
}
