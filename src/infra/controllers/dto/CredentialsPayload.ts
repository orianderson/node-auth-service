import { IsNotEmpty } from 'class-validator';

export class CredentialsPayload {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
