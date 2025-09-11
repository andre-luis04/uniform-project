import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Icart } from "../interfaces/cart.interface";

export class CreateCartDto implements Omit<Icart, "id"> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id_user: string;
}
