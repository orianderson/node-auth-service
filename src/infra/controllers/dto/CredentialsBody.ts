import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
