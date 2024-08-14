import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get<string>('JWT_SECRET_KEY', 'SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('REFRESH_TOKEN_JWT_VALID', '24h'),
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
