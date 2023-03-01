export class NotFoundError extends Error {
  readonly name = 'NotFoundError';

  constructor() {
    super(`Data not found.`);
  }
}
