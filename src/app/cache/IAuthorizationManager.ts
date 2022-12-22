export abstract class IAuthorizationManager {
  abstract setKey(
    key: string,
    value: string,
    expiration: number,
  ): Promise<void>;
  abstract getKey(key: string): Promise<string | unknown>;
  abstract isKey(key: string): Promise<boolean>;
  abstract delete(key: string): Promise<void>;
}
