import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { IUser } from "../interfaces/user.interface";
import { CartItemEntity } from "src/modules/cart_item/entities/cart_item.entity";

export class ResponseUserDto implements Omit<IUser, "password"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  
}
