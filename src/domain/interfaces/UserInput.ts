export class InputCreateUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  use_terms: boolean;
  use_privacy: boolean;
  password: string;
}

export class InputCredentials {
  email: string;
  password: string;
}

export class UserData {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  profile?: string;
  password?: string;
}

export class UserIdentity {
  id?: string;
  email?: string;
  username?: string;
}

export class UserUpdate {
  id?: string;
  email?: string;
  username?: string;
  data: UserData;
}
