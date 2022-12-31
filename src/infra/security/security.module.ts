import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentModule } from '@infra/config';
import { BcryptService } from './bcrypt';
import { JwtTokenService, RefreshTokenService } from './jwt';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '24h' },
    }),
    EnvironmentModule,
  ],
  providers: [BcryptService, JwtTokenService, RefreshTokenService],
  exports: [BcryptService, JwtTokenService, RefreshTokenService],
})
export class SecurityModule {}
