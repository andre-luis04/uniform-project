import { ApiProperty } from "@nestjs/swagger";
import { ICartItem } from "../interfaces/cartItem.interface";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartItemDto
  implements Omit<ICartItem, "id" | "created_at" | "updated_at">
{
  @ApiProperty({ example: "2" })
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @ApiProperty()
  @IsNotEmpty()
  id_variant!: string;
}
