import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IOrder } from "../interfaces/order.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto implements Omit<IOrder, "id" | "created_at"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_client: string;
}
