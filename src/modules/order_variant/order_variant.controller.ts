import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OrderVariantService } from "./order_variant.service";
import { CreateOrderVariantDto } from "./dto/create-order_variant.dto";
import { UpdateOrderVariantDto } from "./dto/update-order_variant.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Order product variant")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("order-product-variant")
export class OrderVariantController {
  constructor(private readonly orderVariantService: OrderVariantService) {}

  @Get()
  @ApiOperation({ description: "retorna todos os pedidos com produto" })
  @ApiBearerAuth()
  findAll() {
    return this.orderVariantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ description: "retorna um pedido com produto especificado pelo id" })
  findOne(@Param("id") id: string) {
    return this.orderVariantService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ description: "altera uma ou mais propriedades do pedido com produto" })
  update(
    @Param("id") id: string,
    @Body() updateOrderVariantDto: UpdateOrderVariantDto
  ) {
    return this.orderVariantService.update(id, updateOrderVariantDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "deleta um pedido com produto" })
  remove(@Param("id") id: string) {
    return this.orderVariantService.remove(id);
  }
}
