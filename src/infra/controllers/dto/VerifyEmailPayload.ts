import { IsNotEmpty } from 'class-validator';

export class VerifyEmailPayload {
  @IsNotEmpty()
  email: string;
}

export class VerifyCodePayload {
  @IsNotEmpty()
  code: number;
}
