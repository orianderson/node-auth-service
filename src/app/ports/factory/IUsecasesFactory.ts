import { IInputPort } from '@app/ports';
import {
  InputCreateUser,
  CreatedUserOutput,
  InputCredentials,
  UserOutput,
  UserIdentity,
} from '@domain/interfaces';
import { InvalidPasswordError } from '@domain/errors';

export abstract class IUsecasesFactory {
  abstract registerUser(): IInputPort<InputCreateUser, CreatedUserOutput>;
  abstract signIn(): IInputPort<InputCredentials, UserOutput>;
  abstract isUser(): IInputPort<UserIdentity, string>;
  abstract resetPassword(): IInputPort<InvalidPasswordError, boolean>;
}
