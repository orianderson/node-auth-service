import { HandleException, IError } from './HandleException';

export class BadRequestInterface extends HandleException {
  constructor(message: IError) {
    super(400, message);
  }
}
