import {
  IInputPort,
  IInputAuth,
  IInputUserId,
  IInputPassword,
} from '@app/ports';
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
  abstract signIn(): IInputAuth<InputCredentials, UserOutput>;
  abstract isUser(): IInputUserId<UserIdentity, boolean>;
  abstract resetPassword(): IInputPassword<InvalidPasswordError, boolean>;
}
