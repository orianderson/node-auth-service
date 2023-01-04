export interface Value {
  value: string | number;
  expiration: number;
}

export abstract class IAuthorizationManager {
  abstract setKey(key: string, value: Value): Promise<void>;
  abstract getKey(key: string): Promise<string | unknown>;
  abstract isKey(key: string): Promise<boolean>;
  abstract delete(key: string): Promise<void>;
}
