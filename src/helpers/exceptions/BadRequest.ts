import { HandleException, IError } from '../HandleException';
import { StatusCodeResponse } from '../constants';

export class BadRequestException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.BAD_REQUEST, message);
  }
}
