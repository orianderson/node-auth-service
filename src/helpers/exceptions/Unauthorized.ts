import { HandleException, IError, StatusCodeResponse } from '../../helpers';

export class UnauthorizedException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.UNAUTHORIZED, message);
  }
}
