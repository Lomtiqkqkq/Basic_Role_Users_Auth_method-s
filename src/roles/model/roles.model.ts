import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UsersModel } from "../../users/model/users.model";
import { UserRolesModel } from "./user.roles.model";
interface RoleCreationAttrs{
  value: string,
  description: string,
}

@Table({tableName:'roles',createdAt:false,updatedAt:false})
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  value: string
  @Column({ type: DataType.STRING, allowNull: true })
  description: string
  @BelongsToMany(()=>UsersModel,()=>UserRolesModel)
  users:UsersModel[]
}