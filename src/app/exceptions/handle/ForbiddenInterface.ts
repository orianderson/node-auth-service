import { HandleException, IError } from './HandleException';

export class ForbiddenInterface extends HandleException {
  constructor(message: IError) {
    super(403, message);
  }
}
