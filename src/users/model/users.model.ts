import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
// import { AccModel } from "../../accounts/model/acc.model";
import { RolesModel } from "../../roles/model/roles.model";
import { UserRolesModel } from "../../roles/model/user.roles.model";


@Table({tableName:'users',createdAt:false,updatedAt:false})
export class UsersModel extends Model<UsersModel> {
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true,allowNull:false })
    id: number
    @Index('username')
    @Column({ type: DataType.STRING, allowNull: true })
    username: string
    @Index('discord_id')
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    discordId: string
    @Index('avatar')
    @Column({ type: DataType.STRING })
    avatar: string;
    @Column({ type: DataType.STRING })
    refreshToken: string;
  // @HasMany(()=>AccModel)
  // accountId:AccModel
  @BelongsToMany(()=>RolesModel,()=>UserRolesModel)
  roles:RolesModel[]
}