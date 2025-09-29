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
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Order")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/order")
export class AdmOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ description: "encontra todos os pedidos" })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  @ApiOperation({ description: "encontra o pedido pelo seu id" })
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ description: "altera um pedido" })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "exclui um pedido" })
  remove(@Param("id") id: string) {
    return this.orderService.remove(id);
  }
}
