import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentModule } from '@infra/config';
import { BcryptService } from './bcrypt';
import { AuthTokenService } from './auth-token.service';

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
  providers: [BcryptService, AuthTokenService],
  exports: [BcryptService, AuthTokenService],
})
export class SecurityModule {}
