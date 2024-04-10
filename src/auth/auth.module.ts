import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { DiscordStrategy } from "./strategy/discord.strategy";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { JwtAccessStrategy } from "./strategy/jwt.access.strategy";
import { JwtRefreshStrategy } from "./strategy/jwt.refresh.strategy";
import { ConfigModule } from "@nestjs/config";
import { JwtAccessAuthGuard } from "./guard/jwt.access.auth.guard";
import { JwtRefreshAuthGuard } from "./guard/jwt.refresh.auth.guard";
import { UsersModule } from "../users/users.module";
import { BullModule } from "@nestjs/bull";


@Module({

  controllers: [AuthController],
  providers: [AuthService,DiscordStrategy,JwtAccessAuthGuard,JwtRefreshAuthGuard,JwtAccessStrategy,JwtRefreshStrategy],
  imports:[BullModule.registerQueue({
    name: 'auth',
  }),
    ConfigModule,
    UsersModule,
    JwtModule.register({})
  ],
  exports:[
    JwtModule,
    JwtAccessAuthGuard,
  ]
})
export class AuthModule {}
