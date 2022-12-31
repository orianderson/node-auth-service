import { DatabaseConfig } from './database';
import { JWTConfig } from './jwt';

export abstract class IEnvironment implements DatabaseConfig, JWTConfig {
  abstract getJwtSecret(): string;
  abstract getJwtExpirationTime(): string;
  abstract getJwtRefreshSecret(): string;
  abstract getJwtRefreshExpirationTime(): string;
  abstract getDatabaseUrl(): string;
}
