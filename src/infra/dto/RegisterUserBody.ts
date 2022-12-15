import { IsNotEmpty } from 'class-validator';

export class RegisterUserBody {
  id?: string;

  @IsNotEmpty()
  name: string;

  job: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  whatsapp?: string;

  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  city: string;

  picture?: string;

  created_at?: Date;
  // TODO - password
}
