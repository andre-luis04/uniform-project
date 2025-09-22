import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "andre.luis@pormade" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "andre123" })
  @IsNotEmpty()
  password: string;
}
