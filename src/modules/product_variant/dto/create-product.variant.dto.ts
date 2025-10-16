import { IsNotEmpty, IsString } from "class-validator";
import { IProductVariants } from "../interfaces/product.variant.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductVariantDto implements Omit<IProductVariants, "id"> {
  @ApiProperty({ example: "19b5ed9b-0f05-4ac6-8b22-17122dbe9da5" })
  @IsNotEmpty()
  @IsString()
  id_color!: string;

  @ApiProperty({ example: "04b31292-9991-4320-90b9-241c6d6a4725" })
  @IsNotEmpty()
  @IsString()
  id_product!: string;

  @ApiProperty({ example: "b559d7c7-8163-4f75-a153-c549ad708e3c" })
  @IsString()
  id_size!: string;

  @ApiProperty({ example: "79.90" })
  price!: number;

  @ApiProperty({ example: "10" })
  stock!: number;
}
