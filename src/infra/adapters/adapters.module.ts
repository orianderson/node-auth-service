import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentConfigModule } from '../config';
import { BcryptService } from './bcrypt.service';
import { JwtTokenService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';
import { MailService } from './mail.service';

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
  providers: [BcryptService, JwtTokenService, RefreshTokenService, MailService],
  exports: [BcryptService, JwtTokenService, RefreshTokenService, MailService],
})
export class AdaptersModule {}
