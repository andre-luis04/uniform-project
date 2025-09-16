import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@ApiBearerAuth()
@Controller("products")
export class UserProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }
}
