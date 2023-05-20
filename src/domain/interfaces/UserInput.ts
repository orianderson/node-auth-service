export class Credentials {
  email: string;
  password: string;
}

export interface Payload {
  id: string;
  name: string;
  email: string;
  profile: string;
  active: boolean;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}

export class UserData {
  id?: string;
  name?: string;
  active?: boolean;
  email?: string;
  profile?: string;
  password?: string;
}

export class UserIdentity {
  id?: string;
  email?: string;
}

export class UserUpdate {
  id?: string;
  email?: string;
  data: UserData;
}

export class NewUser {
  id?: string;
  name: string;
  email: string;
  profile: string;
  active?: boolean;
  use_terms: boolean;
  use_privacy: boolean;
  password: string;
}
