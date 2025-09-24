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
import { ProductVariantsService } from "./variants.service";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Product variant")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/product-variant")
export class AdmProductVariantsController {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService
  ) {}

  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.ProductVariantsService.create(createProductVariantDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ProductVariantsService.findOne(id);
  }
  @Get()
  findAll() {
    return this.ProductVariantsService.findAll();
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
