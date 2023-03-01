import { Either, left, right } from '@helpers/either';
import { IInputPort } from '@app/ports';
import { InputCode } from '../ports';

export class VerifyCodeUsecases implements IInputPort<InputCode, void> {
  async execute(data: InputCode): Promise<void> {
    console.log(data);
  }
}
