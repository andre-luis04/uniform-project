import { ApiProperty } from "@nestjs/swagger";
import { IcolorEntity } from "../interfaces/color.interface";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto implements Omit<IcolorEntity, "id"> {
  @ApiProperty({ example: "Azul" })
  @IsString()
  @IsNotEmpty()
  color: string;
}
