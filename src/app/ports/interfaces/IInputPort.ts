import { Either } from '@helpers/either';
import { InvalidCredentialsError, InvalidUserError } from '@app/errors';

export interface IInputPort<I, O = void> {
  execute(data: I): Promise<O>;
}

export interface IInputAuth<I, O = void> {
  execute(data: I): Promise<Either<InvalidCredentialsError, O>>;
}

export interface IInputUserId<I, O = void> {
  execute(data: I): Promise<Either<InvalidUserError, O>>;
}
