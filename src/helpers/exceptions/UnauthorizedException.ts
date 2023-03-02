import { HandleException } from './HandleException';
import { StatusResponse } from '../constants';

export class Unauthorized extends HandleException {
  constructor(message: string) {
    super(StatusResponse.UNAUTHORIZED.statusCode, {
      code_error: null,
      message: message,
    });
  }
}
