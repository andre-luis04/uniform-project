import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
} from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { CreateProductVariantDto } from "./dto/create-product.variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product.variant.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
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

  @HttpCode(204)
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

    @ApiResponse({
    status: 200,
    description: "variante de produto especificado retornado com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:28:20.901Z",
            updated_at: "2025-10-08T20:28:20.901Z",
            id: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
            id_product: "0f8e161c-aa2f-4f82-bda4-add179abb958",
            id_color: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
            price: "170",
            id_size: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
            stock: 10,
            ids_media: [
              "32646128901378048"
            ],
            product: {
              created_at: "2025-10-08T20:26:48.948Z",
              updated_at: "2025-10-13T17:56:02.744Z",
              id: "0f8e161c-aa2f-4f82-bda4-add179abb958",
              name: "Camisa Polo",
              description: "100% algodão é vdd 100% nem 1% de outra coisa confia"
            },
            size: {
              created_at: "2025-10-08T20:26:57.275Z",
              updated_at: "2025-10-08T20:26:57.275Z",
              id: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
              size: "P"
            },
            color: {
              created_at: "2025-10-08T20:27:03.773Z",
              updated_at: "2025-10-08T20:27:03.773Z",
              id: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
              color: "Azul"
            }
          }
        ],
      },
    },
  })
  @Get(":id")
  @ApiOperation({ description: "encontra uma variante pelo id" })
  findOne(@Param("id") id: string) {
    return this.ProductVariantsService.findOne(id);
  }

    @ApiResponse({
      status: 200,
      description: "todas as variantes de produtos retornadas com sucesso",
      content: {
        "application/json": {
          example: [
           {
              id: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
              price: "170",
              stock: 10,
              product: {
                id: "0f8e161c-aa2f-4f82-bda4-add179abb958",
                name: "Camisa Polo"
              },
              size: {
                id: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
                size: "P"
              },
              color: {
                id: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
                color: "Azul"
              }
            },
            {
              id: "e18c40a8-812e-477a-8b26-4c5e3896be28",
              price: "199",
              stock: 10,
              product: {
                id: "5b6f8e3d-4bc2-4de4-a404-947c5cf4bde7",
                name: "Camisa Social"
              },
              size: {
                id: "f162c3d5-e085-4fa4-a5f3-df468b191995",
                size: "XG"
              },
              color: {
                id: "ae2ad5e4-30df-4e17-8a7b-cc2e61f84dcf",
                color: "vermelho"
              }
            },
          ],
        },
      },
    })
  @Get()
  @ApiOperation({ description: "encontra todas as variantes" })
  findAll() {
    return this.ProductVariantsService.findAll();
  }

  @HttpCode(204)
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

  @HttpCode(204)
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

  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ description: "exclui uma variante" })
  remove(@Param("id") id: string) {
    return this.ProductVariantsService.remove(id);
  }
}
