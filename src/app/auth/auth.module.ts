import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthModule } from './google/google.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { UserModule } from '../../models/user/user.module';

@Module({
  controllers: [],
  imports: [UserModule, PassportModule, GoogleOauthModule, JwtAuthModule],
})
export class AuthModule {}
