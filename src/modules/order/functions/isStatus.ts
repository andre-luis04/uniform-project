import { OrderStatus } from "src/enums/status.enum";
import { UpdateOrderDto } from "../dto/update-order.dto";

export function IsStatus(value: any): value is OrderStatus {
  return Object.values(OrderStatus).includes(value);
}
