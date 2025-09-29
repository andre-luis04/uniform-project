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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Product variant")
@ApiBearerAuth()
@Controller("product-variant")
export class UserProductVariantsController {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService
  ) {}

  @Get(":productId")
  @ApiOperation({
    description:
      "encontra uma variante pelo produto (ex: quando clica na camisa polo, tras as opçoes de cor e tamanho disponivel)",
  })
  findAll(@Param("productId", ParseUUIDPipe) productId: string) {
    return this.ProductVariantsService.findAllByProduct(productId);
  }
}
