import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(objectError: object) {
    super(objectError, HttpStatus.BAD_REQUEST);
  }
}
