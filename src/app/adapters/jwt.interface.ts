import { IJwtPayload } from './IJwtPayload';

export interface IJwtService {
  checkToken(token: string): Promise<boolean>;
  createToken(payload: IJwtPayload): string;
}
