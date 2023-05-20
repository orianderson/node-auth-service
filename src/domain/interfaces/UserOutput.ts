export class UserOutput {
  id: string;
  name: string;
  email: string;
  profile: string;
  active: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export class UserCreated {
  id: string;
}
