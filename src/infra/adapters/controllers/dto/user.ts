import {
  UserData,
  UserUpdate,
} from './../../../../domain/interfaces/UserInput';
import {
  InputCreateUser,
  CreatedUserOutput,
  UserOutput,
  UserIdentity,
} from '@domain/interfaces';

export class BodyCreateUser implements InputCreateUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  password: string;
}

export class ResponseCreatedUser implements CreatedUserOutput {
  id: string;
}

export class BodyCredentials {
  email: string;
  password: string;
}

export class ResponseSignIn implements UserOutput {
  id: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  accessToken: string;
  refreshToken: string;
}

export class BodyIdentityUser implements UserIdentity {
  email: string;
}

export class BodyUpdate implements UserData {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  profile?: string;
  password?: string;
}
