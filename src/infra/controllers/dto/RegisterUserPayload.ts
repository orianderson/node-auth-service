import { IsNotEmpty } from 'class-validator';

export class RegisterUserPayload {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  created_at?: Date;

  @IsNotEmpty()
  password?: string;
}
