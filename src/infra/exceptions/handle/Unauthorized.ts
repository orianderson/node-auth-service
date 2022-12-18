import { HandleException, IError, StatusCodeResponse } from '@helpers/index';

export class Unauthorized extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.UNAUTHORIZED, message);
  }
}
