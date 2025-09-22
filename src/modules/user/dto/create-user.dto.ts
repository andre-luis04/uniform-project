import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../interfaces/user.interface";

export class CreateUserDto implements Omit<IUser, "id"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({ require_tld: true })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
