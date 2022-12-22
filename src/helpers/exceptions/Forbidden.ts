import { HandleException, IError } from './HandleException';
import { StatusCodeResponse } from '../constants';

export class ForbiddenException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.FORBIDDEN, message);
  }
}
