import { HandleException, IError } from '../../helpers';
import { StatusCodeResponse } from '../../helpers';

export class Unauthorized extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.UNAUTHORIZED, message);
  }
}
