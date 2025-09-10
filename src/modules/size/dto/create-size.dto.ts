import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsizeEntity } from "../interfaces/size.interface";

export class CreateSizeDto implements Omit<IsizeEntity, "id"> {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    size: string; 
}
