import { DatabaseConfig } from './database';
import { JWTConfig } from './jwt';
import { EmailConfig } from './IMailEnvironment';

export abstract class IEnvironment
  implements DatabaseConfig, JWTConfig, EmailConfig
{
  abstract getEmailUser(): string;
  abstract getEmailPassword(): string;
  abstract getEmailServer(): string;
  abstract getEmailService(): string;
  abstract getJwtSecret(): string;
  abstract getJwtExpirationTime(): string;
  abstract getJwtRefreshSecret(): string;
  abstract getJwtRefreshExpirationTime(): string;
  abstract getDatabaseUrl(): string;
}
