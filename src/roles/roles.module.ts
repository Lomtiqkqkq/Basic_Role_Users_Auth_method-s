import { forwardRef, Module } from "@nestjs/common";
import { RolesController } from './controller/roles.controller';
import { RolesService } from './service/roles.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModel } from "./model/roles.model";
import { UserRolesModel } from "./model/user.roles.model";
import { UsersModel } from "../users/model/users.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports:[
    SequelizeModule.forFeature([RolesModel,UsersModel,UserRolesModel]),
  ],
  exports:[RolesService]
})
export class RolesModule {}
