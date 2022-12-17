import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { BcryptService } from './bcrypt.service';
import { JwtTokenService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';

import { EnvironmentConfigModule } from '@infra/config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '24h' },
    }),
    EnvironmentConfigModule,
  ],
  providers: [BcryptService, JwtTokenService, RefreshTokenService],
  exports: [BcryptService, JwtTokenService, RefreshTokenService],
})
export class SecurityModule {}
