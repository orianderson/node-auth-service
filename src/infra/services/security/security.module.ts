import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';

import { BcryptService } from './bcrypt.service';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [BcryptService, JwtTokenService],
  exports: [BcryptService, JwtTokenService],
})
export class SecurityModule {}
