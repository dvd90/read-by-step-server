import { config } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../../models/user/user.service';

config();

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    let user = await this.userService.getByEmail(emails[0].value);

    if (!user) {
      user = await this.userService.create({
        provider: 'google',
        name: name.givenName,
        email: emails[0].value,
      });
    }

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
      user,
    };
  }
}
