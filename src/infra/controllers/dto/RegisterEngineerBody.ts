import { IsNotEmpty } from 'class-validator';

export class RegisterEngineerBody {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  whatsapp: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  picture?: string;

  created_at?: Date;

  @IsNotEmpty()
  password?: string;
}
