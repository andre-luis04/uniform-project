import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstant } from "../../constants";
import { UserModule } from "src/modules/user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
