import { DatabaseConfig } from './database.interface';
import { EmailConfig } from './email.interface';
import { JWTConfig } from './jwt.interface';

export abstract class IEnvironmentConfig
  implements DatabaseConfig, JWTConfig, EmailConfig
{
  abstract getEmailUser(): string;
  abstract getEmailPassword(): string;
  abstract getEmailServer(): string;
  abstract getJwtSecret(): string;
  abstract getJwtExpirationTime(): string;
  abstract getJwtRefreshSecret(): string;
  abstract getJwtRefreshExpirationTime(): string;
  abstract getDatabaseUrl(): string;
}
