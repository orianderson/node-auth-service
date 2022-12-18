import { HandleException, IError, StatusCodeResponse } from '../../helpers';

export class BadRequestException extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.BAD_REQUEST, message);
  }
}
