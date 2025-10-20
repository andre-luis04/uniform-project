import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Product variant")
@ApiBearerAuth()
@Controller("product-variant")
export class UserProductVariantsController {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService
  ) {}

  @ApiResponse({
    status: 200,
    description: "todas as variantes de produtos retornadas com sucesso",
    content: {
      "application/json": {
        example: [
          {
            id: "e18c40a8-812e-477a-8b26-4c5e3896be28",
            price: "199",
            ids_media: [
              {
                id: "34403492004450304",
                createdAt: "2025-10-13T16:51:28.897Z",
                updatedAt: "2025-10-13T16:51:28.897Z",
                pathConfigurationId: "27887056398405632",
                filename:
                  "34403492000256000-Camisa_social_manga_longa_algodao_pima_branca_frente.png",
                originalFilename:
                  "Camisa_social_manga_longa_algodao_pima_branca_frente.png",
                size: "1080426",
                mimetype: "image/png",
              },
            ],
            product: {
              id: "5b6f8e3d-4bc2-4de4-a404-947c5cf4bde7",
              name: "Camisa Social",
            },
            size: {
              id: "f162c3d5-e085-4fa4-a5f3-df468b191995",
              size: "XG",
            },
            color: {
              id: "ae2ad5e4-30df-4e17-8a7b-cc2e61f84dcf",
              color: "vermelho",
            },
          },
          {
            id: "d3fd834f-c4d6-4e5d-bdc5-84491e964cf6",
            price: "199",
            ids_media: [
              "está vazio, supondo que nenhuma imagem foi adicionada a esta variante ainda",
            ],
            product: {
              id: "5b6f8e3d-4bc2-4de4-a404-947c5cf4bde7",
              name: "Camisa Social",
            },
            size: {
              id: "7cdc6daf-8bfa-4921-aa53-af03469039d2",
              size: "P",
            },
            color: {
              id: "e24b5f3f-2104-4066-a69c-3c9639a14f76",
              color: "Azul",
            },
          },
        ],
      },
    },
  })
  @ApiOperation({
    description:
      "encontra uma variante pelo produto (ex: quando clica na camisa polo, tras as opçoes de cor e tamanho disponivel)",
    summary: "Retorna as variantes de um produto especifico",
  })
  @Get(":productId")
  findAll(@Param("productId", ParseUUIDPipe) productId: string) {
    return this.ProductVariantsService.findAllByProduct(productId);
  }
}
