import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentConfigModule } from '../config';
import { BcryptService } from './bcrypt.service';

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
  providers: [BcryptService],
  exports: [BcryptService],
})
export class AdaptersModule {}
