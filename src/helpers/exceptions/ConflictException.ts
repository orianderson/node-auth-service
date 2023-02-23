import { HandleException, IError } from './HandleException';
import { StatusResponse } from '../constants';

export class ConflictException extends HandleException {
  constructor(message: IError) {
    super(StatusResponse.CONFLICT.statusCode, message);
  }
}
