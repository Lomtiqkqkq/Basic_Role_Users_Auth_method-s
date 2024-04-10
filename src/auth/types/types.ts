import { RolesModel } from "../../roles/model/roles.model";


export type JwtPayload = {
  sub: string;
  username:string;
  roles:RolesModel
}