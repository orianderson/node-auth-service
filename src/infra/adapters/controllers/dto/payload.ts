import { NewUser, Credentials, UserData } from '@domain/interfaces';

export class UserPayload implements NewUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  use_terms: boolean;
  use_privacy: boolean;
  password: string;
}

export class PayloadCredentials implements Credentials {
  email: string;
  password: string;
}

export class PayloadToUpdateUser implements UserData {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  profile?: string;
  password?: string;
}

export class PayloadCodeNumber {
  code: number;
}

export class PayloadUserEmail {
  email: string;
}
