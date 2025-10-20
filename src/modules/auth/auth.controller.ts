import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
  HttpException,
} from "@nestjs/common";
import { type Response } from "express";
import { type Request } from "express";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { Public } from "src/decorators/public.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCode } from "axios";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({
    description: "rota para fazer login no sistema",
    summary: "Fazer login no sistema",
  })
  async signIn(@Body() signInDto: SignInDto) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );

    return { accessToken, refreshToken };
  }

  @Public()
  @Post("refresh")
  async refreshToken(@Req() req: Request) {
    const cookieToken = req.cookies["refreshToken"];
    const refreshToken = cookieToken;

    if (!refreshToken) {
      throw new UnauthorizedException("refresh token não encontrado");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    return { newAccessToken, newRefreshToken };
  }

  @Public()
  @Post("logout")
  logout() {
    throw new HttpException(
      "metodo nao implementado",
      HttpStatusCode.NotImplemented
    );
  }
}
