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
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { IncreaseStockDto } from "./dto/increase.stock.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

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
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ description: "cria uma variação de produto" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id_color: { type: "string" },
        id_product: { type: "string" },
        id_size: { type: "string" },
        price: { type: "number" },
        stock: { type: "number" },
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
          description: "Array de arquivos (ex: imagens ou vídeos)",
        },
      },
      required: [],
    },
  })
  @UseInterceptors(FilesInterceptor("files"))
  create(
    @Body() createProductVariantDto: CreateProductVariantDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.ProductVariantsService.create(createProductVariantDto, files);
  }

  @Get(":id")
  @ApiOperation({ description: "encontra uma variante pelo id" })
  findOne(@Param("id") id: string) {
    return this.ProductVariantsService.findOne(id);
  }
  @Get()
  @ApiOperation({ description: "encontra todas as variantes" })
  findAll() {
    return this.ProductVariantsService.findAll();
  }

  @Patch("increase-stock/:id")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({
    description:
      "rota para adicionar estoque (o numero inserido será adicionado ao estoque já existente)",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        quantity: { type: "number" },
      },
      required: [],
    },
  })
  increaseStock(@Param("id") id: string, @Body() quantity: IncreaseStockDto) {
    return this.ProductVariantsService.increaseStock(id, quantity);
  }

  @Patch(":id")
  @ApiOperation({
    description: "altera uma ou mais propriedades de uma variante",
  })
  update(
    @Param("id") id: string,
    @Body() updateVariantDto: UpdateProductVariantDto
  ) {
    return this.ProductVariantsService.update(id, updateVariantDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "exclui uma variante" })
  remove(@Param("id") id: string) {
    return this.ProductVariantsService.remove(id);
  }
}
