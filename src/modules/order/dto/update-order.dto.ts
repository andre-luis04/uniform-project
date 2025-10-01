import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { OrderStatus } from "src/enums/status.enum";

export class UpdateOrderDto implements Omit<CreateOrderDto, "id_user"> {
  @ApiProperty({ example: "cancelado | pendente | retirar | concluido" })
  status!: OrderStatus;
}
