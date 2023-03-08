export class InvalidFieldError extends Error {
  readonly name = 'InvalidFieldError';

  constructor(field: string) {
    super(`Field must be provide: ${field}.`);
  }
}
