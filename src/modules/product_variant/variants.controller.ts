import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Product variant")
@Controller("product-variant")
export class ProductVariantsController {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService
  ) {}

  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.ProductVariantsService.create(createProductVariantDto);
  }

  @Get()
  findAll() {
    return this.ProductVariantsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ProductVariantsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVariantDto: UpdateProductVariantDto
  ) {
    return this.ProductVariantsService.update(id, updateVariantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ProductVariantsService.remove(id);
  }
}
