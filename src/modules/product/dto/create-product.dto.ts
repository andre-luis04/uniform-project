import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IProductEntity } from "../interfaces/product.interface";

export class CreateProductDto implements Omit<IProductEntity, "id"> {
  @ApiProperty({ example: "Camisa Polo" })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: "100% algodão" })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
