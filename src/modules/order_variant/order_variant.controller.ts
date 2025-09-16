import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrderVariantService } from "./order_variant.service";
import { CreateOrderVariantDto } from "./dto/create-order_variant.dto";
import { UpdateOrderVariantDto } from "./dto/update-order_variant.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Order product variant")
@ApiBearerAuth()
@Controller("order-product-variant")
export class OrderVariantController {
  constructor(private readonly orderVariantService: OrderVariantService) {}

  @Get()
  findAll() {
    return this.orderVariantService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderVariantService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrderVariantDto: UpdateOrderVariantDto
  ) {
    return this.orderVariantService.update(id, updateOrderVariantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderVariantService.remove(id);
  }
}
