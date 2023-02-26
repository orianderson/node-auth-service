export class InputCreateUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  profile: string;
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
