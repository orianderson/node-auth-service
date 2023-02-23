import { HandleException, IError } from './HandleException';
import { StatusResponse } from '../constants';

export class BadRequestException extends HandleException {
  constructor(message: IError) {
    super(StatusResponse.BAD_REQUEST.statusCode, message);
  }
}
