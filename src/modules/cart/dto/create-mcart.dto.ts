import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Icart } from "../interfaces/cart.interface";

export class CreateMcartDto implements Omit<Icart, "id">{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id_client: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id_cart_item: string;
}
