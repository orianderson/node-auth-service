import { HandleException, IError } from '../../helpers';
import { StatusCodeResponse } from '../../helpers';

export class ForbiddenInterface extends HandleException {
  constructor(message: IError) {
    super(StatusCodeResponse.FORBIDDEN, message);
  }
}
