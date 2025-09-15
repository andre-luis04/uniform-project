import { isDecimal, IsNotEmpty, isNumber, IsString } from "class-validator";
import { IProductVariants } from "../interfaces/product.variant.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductVariantDto implements Omit<IProductVariants, "id"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_product: string;

  @ApiProperty()
  @IsString()
  id_size: string;

  @ApiProperty({ example: "49.99" })
  price: number;
}
