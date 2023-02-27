import { Either } from '@helpers/either';
import { InvalidCredentialsError, InvalidUserError } from '@app/errors';
import { InvalidPasswordError } from '@domain/errors';

export interface IInputPort<I, O = void> {
  execute(data: I): Promise<O>;
}

export interface IInputAuth<I, O = void> {
  execute(data: I): Promise<Either<InvalidCredentialsError, O>>;
}

export interface IInputUserId<I, O = void> {
  execute(data: I): Promise<Either<InvalidUserError, O>>;
}

export interface IInputPassword<I, O = void> {
  execute(data: I): Promise<Either<InvalidPasswordError, O>>;
}

export interface IInputCode<I, O = void> {
  execute(data: I): Promise<O>;
}
