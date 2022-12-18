import { HandleException, IError, StatusCodeResponse } from '../../helpers';

export class ForbiddenException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.FORBIDDEN, message);
  }
}
