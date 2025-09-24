import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Product variant")
@ApiBearerAuth()
@Controller("product-variant")
export class UserProductVariantsController {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService
  ) {}

  @Get(":productId")
  findAll(@Param("productId", ParseUUIDPipe) productId: string) {
    return this.ProductVariantsService.findAllByProduct(productId);
  }
}
