import { HandleException, IError } from './HandleException';
import { StatusCodeResponse } from '../constants';

export class ConflictException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.CONFLICT, message);
  }
}
