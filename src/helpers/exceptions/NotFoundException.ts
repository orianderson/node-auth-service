import { HandleException } from './HandleException';
import { StatusResponse } from '../constants';

export class NotFoundException extends HandleException {
  constructor() {
    super(StatusResponse.NOT_FOUND.statusCode, {
      code_error: null,
      message: 'User not founded.',
    });
  }
}
