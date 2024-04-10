import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {RolesModel} from "./roles.model";
import { UsersModel } from "../../users/model/users.model";


@Table({tableName:'user-roles',createdAt:false,updatedAt:false})
export class UserRolesModel extends Model<UserRolesModel>{
  @Column({type:DataType.INTEGER,unique:true,primaryKey:true,autoIncrement:true})
  id:number
  @ForeignKey(()=>RolesModel)
  @Column({type:DataType.INTEGER})
  roleId:string
  @ForeignKey(()=>UsersModel)
  @Column({type:DataType.INTEGER})
  userId:string
}