import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
} from "@nestjs/common";
import { OrderVariantService } from "./order_variant.service";
import { CreateOrderVariantDto } from "./dto/create-order_variant.dto";
import { UpdateOrderVariantDto } from "./dto/update-order_variant.dto";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
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

  @ApiBearerAuth()
  @ApiOperation({
    description: "retorna todos os pedidos com produto",
    summary: "Listar todos os itens pedidos",
  })
  @Get()
  findAll() {
    return this.orderVariantService.findAll();
  }

  @ApiNotFoundResponse({ description: "**Pedido com produto não encontrado**" })
  @ApiOperation({
    description: "retorna um pedido com produto especificado pelo id",
    summary: "Retorna um item pedido pelo ID",
  })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.orderVariantService.findOne(id);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Pedido com produto não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "altera uma ou mais propriedades do pedido com produto",
    summary: "Alterar um item pedido",
  })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateOrderVariantDto: UpdateOrderVariantDto
  ) {
    return this.orderVariantService.update(id, updateOrderVariantDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Pedido com produto não encontrado**" })
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({
    description: "deleta um pedido com produto",
    summary: "Deleta um item pedido",
  })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.orderVariantService.remove(id);
  }
}
