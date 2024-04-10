import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersModel } from "../model/users.model";
import { RolesService } from "../../roles/service/roles.service";
import { AddRoleDto } from "../dto/addRoleDto";
import { RolesModel } from "../../roles/model/roles.model";
import { UpdateUserDto } from "../dto/updateUserDto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(UsersModel)private userRepository:typeof UsersModel,
              private roleService:RolesService) {
  }
   getAll(){
    const users =  this.userRepository.findAll({include:{all:true}})
     console.log(users)
    return users
  }
  async getOne(username:string){
    const user = await this.userRepository.findOne({where:{username},include:{model:RolesModel}})
    return user
  }

  async createUser(details) {
    const user = await this.userRepository.create(details)
    const role = await this.roleService.getRoleByValue('DefaultUser')
    if(!role) {
      throw new Error('not role!, US S27')
    }
    await user.$set('roles',[role.id])
    user.roles=[role]
    return user
  }
  async updateUser(updateUserDto:UpdateUserDto,id:number){
    const user = await this.userRepository.update(updateUserDto,{where:{id}})
    return user
  }
  async addRole(addRoleDto:AddRoleDto){
    const role = await this.roleService.getRoleByValue(addRoleDto.value)
    const user = await this.getOne(addRoleDto.discordId)
    if(role && user){
      await user.$add('roles',[role.id])
      return user
    }throw new HttpException('role or user has not found',HttpStatus.NOT_FOUND)
  }
}
