import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { DiscordAuthGuard } from "../guard/discord.auth.guard";
import { JwtAccessAuthGuard } from "../guard/jwt.access.auth.guard";
import { JwtRefreshAuthGuard } from "../guard/jwt.refresh.auth.guard";
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }
  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req) {
    return req.user
  }
  @UseGuards(JwtAccessAuthGuard)
  @Get('/profile')
  profile(@Req()req){
    return req.user
  }
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const discordId = req.user['username'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(discordId, refreshToken);
  }
}
