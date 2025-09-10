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

@Controller("order-variant")
export class OrderVariantController {
  constructor(private readonly orderVariantService: OrderVariantService) {}

  @Post()
  create(@Body() createOrderVariantDto: CreateOrderVariantDto) {
    return this.orderVariantService.create(createOrderVariantDto);
  }

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
