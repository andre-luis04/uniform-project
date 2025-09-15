import { ApiProperty } from "@nestjs/swagger";
import { IOrderVariant } from "../interfaces/order_variant.interface";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderVariantDto implements Omit<IOrderVariant, "id"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_order: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_product_variant: string;
}
