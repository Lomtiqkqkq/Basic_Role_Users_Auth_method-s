import { Module } from '@nestjs/common';
import * as process from "process";
import { UsersModule } from './users/users.module';
import { UsersModel } from "./users/model/users.model";
import { RolesModule } from './roles/roles.module';
import { RolesModel } from "./roles/model/roles.model";
import { UserRolesModel } from "./roles/model/user.roles.model";
import { AuthModule } from "./auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
@Module({
  controllers: [],
  providers: [],
  imports: [ BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),ConfigModule.forRoot({envFilePath:'.env'}),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService)=>({
        dialect:'postgres',
        host: configService.get('POSTGRES_DB_HOST'),
        port: Number(configService.get('POSTGRES_DB_PORT')),
        username: configService.get('POSTGRES_DB_USERNAME'),
        password: configService.get('POSTGRES_DB_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        models: [
          UsersModel,
          RolesModel,
          UserRolesModel,

        ],
        autoLoadModels: true
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    AuthModule,
    UsersModule,
    RolesModule,

  ],
})
export class AppModule {}
