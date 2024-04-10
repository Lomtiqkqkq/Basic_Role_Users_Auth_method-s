import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesModel } from "../model/roles.model";
import { CreateRoleDto } from "../dto/createRoleDto";
@Injectable()
export class RolesService {
  constructor(@InjectModel(RolesModel)private roleRepository:typeof RolesModel,
  ) {}
  async createRole(roleDto:CreateRoleDto){
    const DbRole= await this.getRoleByValue(roleDto.value)
    if(!DbRole){
      const role = await this.roleRepository.create(roleDto)
      return role
    }throw new HttpException('role has already exists',HttpStatus.CONFLICT)
  }
  async getRoleByValue(value:string) {
    const role = await this.roleRepository.findOne({ where: { value } })
    return role
  }
}
