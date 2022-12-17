import { IJwtServicePayload } from '@app/adapters';

export abstract class IRefreshTokenService {
  abstract checkRefreshToken(refreshToken: string): Promise<boolean>;
  abstract createRefreshToken(payload: IJwtServicePayload): string;
}
