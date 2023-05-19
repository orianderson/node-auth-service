import { IInputPort, UserId } from '@app/ports';
import {
  UserCreated,
  Credentials,
  UserOutput,
  UserIdentity,
  NewUser,
} from '@domain/interfaces';
import { InvalidPasswordError } from '@domain/errors';

export abstract class IUsecasesFactory {
  abstract registerUser(): IInputPort<NewUser, UserCreated>;
  abstract signIn(): IInputPort<Credentials, UserOutput>;
  abstract isUser(): IInputPort<UserIdentity, string>;
  abstract resetPassword(): IInputPort<InvalidPasswordError, boolean>;
  abstract checkCredentials(): IInputPort<string, UserId>;
}
