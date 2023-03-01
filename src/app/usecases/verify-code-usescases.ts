import { Either, left, right } from '@helpers/either';
import { IInputPort } from '@app/ports';
import { InputCode } from '../ports';

export class VerifyCodeUsecases implements IInputPort<InputCode, void> {
  execute(data: InputCode): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
