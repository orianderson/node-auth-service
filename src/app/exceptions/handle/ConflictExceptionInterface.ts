import { HandleException, IError } from './HandleException';

export class ConflictExceptionInterface extends HandleException {
  constructor(message: IError) {
    super(409, message);
  }
}
