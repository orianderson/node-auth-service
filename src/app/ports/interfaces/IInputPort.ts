import { Either } from '@helpers/either';
import { InvalidCredentialsError } from '@app/errors';
export interface IInputPort<I, O = void> {
  execute(data: I): Promise<O>;
}

export interface IInputAuth<I, O = void> {
  execute(data: I): Promise<Either<InvalidCredentialsError, O>>;
}
