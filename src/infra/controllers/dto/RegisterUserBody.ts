import { IsNotEmpty } from 'class-validator';

export class RegisterUserBody {
  id?: string;

  @IsNotEmpty()
  name: string;

  picture?: string;

  created_at?: Date;

  @IsNotEmpty()
  password?: string;
}
