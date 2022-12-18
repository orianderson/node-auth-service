import { HandleException, IError } from '../../../helpers';
import { StatusCodeResponse } from '../../../helpers';

export class ConflictException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.CONFLICT, message);
  }
}
