export class InvalidUserError extends Error {
  readonly name = 'InvalidUserError';

  constructor() {
    super(`User not founded`);
  }
}
