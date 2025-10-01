import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IOrder } from "../interfaces/order.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto implements Omit<IOrder, "id" | "created_at"> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_user!: string;
}
