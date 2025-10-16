import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "teste@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: "1234" })
  @IsNotEmpty()
  password!: string;
}
