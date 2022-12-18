import { HandleException, IError } from '../../helpers';
import { StatusCodeResponse } from '../../helpers';

export class BadRequest extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.BAD_REQUEST, message);
  }
}
