import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Product")
@ApiBearerAuth()
@Controller("product")
export class UserProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ description: "encontra todos os produtos disponiveis" })
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @ApiOperation({ description: "encontra um produto pelo id" })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }
}
