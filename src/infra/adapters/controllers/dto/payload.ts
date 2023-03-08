import { IsNotEmpty } from 'class-validator';

import { NewUser, Credentials, UserData } from '@domain/interfaces';

export class UserPayload implements NewUser {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  profile: string;

  @IsNotEmpty()
  use_terms: boolean;

  @IsNotEmpty()
  use_privacy: boolean;

  @IsNotEmpty()
  password: string;
}

export class PayloadCredentials implements Credentials {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class PayloadToUpdateUser implements UserData {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  profile?: string;
  password?: string;
}

export class PayloadCodeNumber {
  @IsNotEmpty()
  code: number;
}

export class PayloadUserEmail {
  @IsNotEmpty()
  email: string;
}
