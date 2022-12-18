import { EngineerInterface } from '../../domain/types';

export abstract class IEngineerRepository {
  abstract verifyIfUserExist(email: string): Promise<void>;
  abstract create(body: EngineerInterface): Promise<void>;
  abstract signUser(email: string): Promise<EngineerInterface>;
}
