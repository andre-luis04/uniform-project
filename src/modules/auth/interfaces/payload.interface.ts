import { UserRoles } from "src/enums/roles.enum";

export interface IJwtpayload {
  sub: string;
  username: string;
  email: string;
  role: UserRoles;
}
