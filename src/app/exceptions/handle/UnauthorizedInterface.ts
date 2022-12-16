import { HandleException, IError } from './HandleException';

export class UnauthorizedInterface extends HandleException {
  constructor(message: IError) {
    super(401, message);
  }
}
