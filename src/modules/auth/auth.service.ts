import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";
import * as bcrypt from "bcrypt";
import { jwtConstant } from "src/constants";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException("email não cadastrado");
    }
    if (user.password !== password) {
      throw new BadRequestException("senha incorreta");
    }

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload, type: "access" },
        { expiresIn: "1h" }
      ),
      this.jwtService.signAsync(
        { ...payload, type: "refresh" },
        { expiresIn: "7d" }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstant.secret,
      });

      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException("usuario não encontrado");
      }

      const newPayload = {
        sub: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      };

      return {
        accessToken: await this.jwtService.signAsync(newPayload, {
          expiresIn: 3600,
        }),
        refreshToken: await this.jwtService.signAsync(newPayload, {
          expiresIn: "7d",
        }),
      };
    } catch (err) {
      throw new UnauthorizedException("refresh token invalido");
    }
  }
}
