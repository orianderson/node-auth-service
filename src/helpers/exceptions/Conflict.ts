import { HandleException, IError, StatusCodeResponse } from '../../helpers';

export class ConflictException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.CONFLICT, message);
  }
}
