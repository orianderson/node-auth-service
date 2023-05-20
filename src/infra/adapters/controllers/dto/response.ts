import { UserCreated, UserOutput } from '@domain/interfaces';

export class ResponseUserId implements UserCreated {
  id: string;
}

export class ResponseUser implements UserOutput {
  id: string;
  name: string;
  email: string;
  profile: string;
  active: boolean;
  accessToken: string;
  refreshToken: string;
}

export class ResponseUserVerified {
  message: string;
  accessToken: string;
}
