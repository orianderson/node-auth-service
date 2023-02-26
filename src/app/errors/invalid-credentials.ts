export class InvalidCredentialsError extends Error {
  readonly name = 'InvalidCredentialsError';

  constructor() {
    super(`Invalid credentials, try again.`);
  }
}
