import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-discord";
import * as process from "process";
import { AuthService } from "../service/auth.service";


@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy,'discord'){
  constructor(private authService:AuthService) {
    super({
      clientID:process.env.DISCORD_CLIENT_ID,
      clientSecret:process.env.DISCORD_CLIENT_SECRET,
      callbackURL:process.env.DISCORD_REDIRECT_URI,
      scope:['identify', 'email', 'guilds', 'guilds.join']
    });
  }
  async validate(accessToken:string,refreshToken:string,profile: Profile) {
    const { username,id:discordId, avatar } = profile;
    const details = {
      username,
    };
    return this.authService.validateUser(details);
  }


}