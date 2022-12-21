import { IsNotEmpty } from 'class-validator';

export class RecoveryPasswordBody {
  @IsNotEmpty()
  email: string;
}
