import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'
import { UsersService } from "../../users/service/users.service";
import { CreateUserDto } from "../../users/dto/createUserDto";
import { RolesModel } from "../../roles/model/roles.model";

@Injectable()
export class AuthService {
  constructor(private userService:UsersService,
              private jwtService:JwtService,
              private configService:ConfigService) {
  }
  async validateUser(createUserDto: { username: string }){
    const DbUser = await this.userService.getOne(createUserDto.username)
    if(!DbUser){
      const newUser= await this.userService.createUser(createUserDto)
      return this.getTokens(newUser.id,newUser.username,newUser.roles)
    }

    const tokens = await this.getTokens(DbUser.id,DbUser.username,DbUser.roles)
    await this.updateRefreshToken(DbUser.id,tokens.refreshToken)
    return tokens
  }
  async hashData(data:string){
    const saltOrRounds = 10
    return bcrypt.hash(data,saltOrRounds)
  }
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.userService.updateUser( { refreshToken: hashedRefreshToken },userId);
  }
  async getTokens(userId: number, username: string,roles:RolesModel[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          roles,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '7d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          roles
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(username:string,refreshToken:string){
    const user = await this.userService.getOne(username)
    if(!user || !user.refreshToken){
      throw new ForbiddenException('Access Denied')
    }
    const refreshTokenMatches = await bcrypt.compare(refreshToken,user.refreshToken)
    if (!refreshTokenMatches) {
      throw new ForbiddenException("Access Denied");
    }
    const tokens = await this.getTokens(user.id, user.username,user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}

