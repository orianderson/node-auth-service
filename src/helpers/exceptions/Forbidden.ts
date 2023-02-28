import { HandleException } from './HandleException';
import { StatusResponse } from '../constants';

export class ForbiddenException extends HandleException {
  constructor() {
    super(StatusResponse.FORBIDDEN.statusCode, {
      code_error: null,
      message: 'Invalid credentials',
    });
  }
}
