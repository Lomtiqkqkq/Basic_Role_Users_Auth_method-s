import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { AddRoleDto } from "../dto/addRoleDto";

@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService) {
  }
  @Get('/getAll')
  getAll(){
    try {
      return this.usersService.getAll()
    }catch (e) {
      console.log(e);
    }
  }
  @Get('/getOne/:discordId')
  getOne(@Param("discordId")discordId:string){
    try {
      console.log('im here')
      return this.usersService.getOne(discordId)
    }catch (e) {
      console.log(e);
    }
  }
  @Post('addRole')
  addRole(@Body()addRoleDto:AddRoleDto){
    try {
      return this.usersService.addRole(addRoleDto)
    }catch (e) {
      console.log(e);
    }
  }
}
