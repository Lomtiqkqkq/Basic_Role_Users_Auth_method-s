import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from "../types/types";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy,'jwt-access') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET')
    });
  }

  async validate(payload: JwtPayload) {
    return payload
  }
}