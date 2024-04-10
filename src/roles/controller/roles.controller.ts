import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "../service/roles.service";
import { CreateRoleDto } from "../dto/createRoleDto";
import { AddRoleDto } from "../../users/dto/addRoleDto";

@Controller('roles')
export class RolesController {
  constructor(private roleService:RolesService) {
  }
  @Post('/create')
  createRole(@Body()roleDto:CreateRoleDto){
    try {
      return this.roleService.createRole(roleDto)
    }catch (e) {
      console.log(e);
    }
  }
  @Get('/:value')
  getRoleByValue(@Param('value')value:string){
    try {
      return this.roleService.getRoleByValue(value)
    }catch (e) {
      console.log(e);
    }
  }
}
