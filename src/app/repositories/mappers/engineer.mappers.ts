import { EngineerInterface } from '../../../domain/types';

export abstract class IEngineerMapper {
  abstract create(body: EngineerInterface): EngineerInterface;
}
