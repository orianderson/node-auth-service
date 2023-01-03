import { IJwtPayload } from '@interfaces/security';

export abstract class IAuthTokenService {
  abstract createToken(payload: IJwtPayload): string;
  abstract checkToken(token: string): Promise<boolean>;
  abstract decodeToken(token: string): any;
}
