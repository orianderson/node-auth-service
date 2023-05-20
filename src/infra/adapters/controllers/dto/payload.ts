import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { NewUser, Credentials, UserData } from '@domain/interfaces';

export class UserPayload implements NewUser {
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  profile: string;

  @ApiProperty()
  @IsNotEmpty()
  use_terms: boolean;

  @ApiProperty()
  @IsNotEmpty()
  use_privacy: boolean;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class PayloadCredentials implements Credentials {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class PayloadToUpdateUser implements UserData {
  @ApiProperty()
  id?: string;
  name?: string;
  email?: string;
  profile?: string;
  password?: string;
}

export class PayloadCodeNumber {
  @ApiProperty()
  @IsNotEmpty()
  code: number;
}

export class PayloadUserEmail {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
