import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModel } from "./model/users.model";
import { RolesModule } from "../roles/roles.module";
import { UserRolesModel } from "../roles/model/user.roles.model";
import { RolesModel } from "../roles/model/roles.model";


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    RolesModule,
    SequelizeModule.forFeature([UsersModel,RolesModel,UserRolesModel])
  ],
  exports:[UsersService]
})
export class UsersModule {}
