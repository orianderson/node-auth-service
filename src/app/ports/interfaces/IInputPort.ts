import { Either } from '@helpers/either';

export interface IInputPort<I, O = void, E = Error> {
  execute(data: I): Promise<Either<E, O> | O>;
}
