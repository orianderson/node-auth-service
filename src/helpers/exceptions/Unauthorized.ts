import { HandleException, IError } from '../HandleException';
import { StatusCodeResponse } from '../constants';

export class UnauthorizedException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.UNAUTHORIZED, message);
  }
}
