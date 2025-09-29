import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { UUID } from "crypto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { currentUser } from "src/decorators/current.user.decorator";
import { UserEntity } from "../user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Order")
@ApiBearerAuth()
@Controller("order")
export class UserOrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("finalize")
  @ApiOperation({ description: "rota para finalizar uma compra pelo usuario" })
  finalizeOrder(@currentUser() user: any): Promise<void> {
    return this.orderService.finalizeOrder(user.userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("by-current-user")
  @ApiOperation({
    description: "encontra todos os pedidos feitos pelo usuario logado",
  })
  findByCurrent(@currentUser() user: any) {
    return this.orderService.findByUser(user.userId);
  }
}
