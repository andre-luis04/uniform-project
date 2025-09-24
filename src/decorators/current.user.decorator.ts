import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CurrentUser } from "src/modules/auth/interfaces/current.user.interface";

export const currentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
