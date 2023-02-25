import { InputCreateUser, CreatedUserOutput } from '@domain/interfaces';

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
