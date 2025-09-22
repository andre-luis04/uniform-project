import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException("email não cadastrado");
    }
    if (user.password !== password) {
      throw new BadRequestException("senha incorreta");
    }

    const payload = { sub: user.id, name: user.name, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: 3600,
      }),
    };
  }
}
