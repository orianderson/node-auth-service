import { HandleException, IError } from '../../helpers';

export class BadRequestInterface extends HandleException {
  constructor(message: IError) {
    super(400, message);
  }
}
