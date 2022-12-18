import { EngineerInterface } from '../../domain/types';

export abstract class IEngineerRepository {
  abstract verifyIfUserExist(email: string): Promise<{ email: string } | null>;
  abstract create(body: EngineerInterface): Promise<void>;
  abstract signUser(email: string): Promise<EngineerInterface>;
  abstract verifyUserById(id: string): Promise<{ id: string } | null>;
}
