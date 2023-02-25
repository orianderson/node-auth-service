import { InputCreateUser } from '@domain/interfaces';

export class InputCreateUser implements InputCreateUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  profile: string;
  password: string;
}
