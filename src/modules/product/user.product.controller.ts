import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Product")
@ApiBearerAuth()
@Controller("product")
export class UserProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: "produtos retornados com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:26:48.948Z",
            updated_at: "2025-10-13T17:56:02.744Z",
            id: "0f8e161c-aa2f-4f82-bda4-add179abb958",
            name: "Camisa Polo",
            description: "100% algodão é vdd 100% nem 1% de outra coisa confia",
            productVariant: [
              {
                id: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
                price: "170",
                ids_media: ["32646128901378048"],
              },
            ],
          },
          {
            created_at: "2025-10-13T16:48:52.509Z",
            updated_at: "2025-10-13T19:04:53.920Z",
            id: "5b6f8e3d-4bc2-4de4-a404-947c5cf4bde7",
            name: "Camisa Social",
            description: "100% algodão",
            productVariant: [
              {
                id: "e18c40a8-812e-477a-8b26-4c5e3896be28",
                price: "199",
                ids_media: ["34403492004450304"],
              },
              {
                id: "d3fd834f-c4d6-4e5d-bdc5-84491e964cf6",
                price: "199",
                ids_media: null,
              },
            ],
          },
        ],
      },
    },
  })
  @ApiOperation({
    description:
      "encontra todos os produtos disponiveis (rota para mostrar os produtos na pagina principal)",
    summary: "Listar todos os produtos",
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: "produto especificado retornado com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-08T20:26:48.948Z",
            updated_at: "2025-10-13T17:56:02.744Z",
            id: "0f8e161c-aa2f-4f82-bda4-add179abb958",
            name: "Camisa Polo",
            description: "100% algodão é vdd 100% nem 1% de outra coisa confia",
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({ description: "**Produto não encontrado**" })
  @ApiOperation({
    description: "encontra um produto pelo id",
    summary: "Encontrar produto pelo ID",
  })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }
}
