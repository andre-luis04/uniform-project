import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { type Response } from "express";
import { type Request } from "express";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { Public } from "src/decorators/public.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({ description: "rota para fazer login no sistema" })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken, refreshToken };
  }

  @Public()
  @Post("refresh")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const cookieToken = req.cookies?.["refresh_token"];
    const refreshToken = cookieToken;

    if (!refreshToken) {
      throw new UnauthorizedException("refresh token não encontrado");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Public()
  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("refresh_token");
    return { message: "Logged out" };
  }
}
