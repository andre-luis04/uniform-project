import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { currentUser } from "src/decorators/current.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags("Cart item")
@ApiBearerAuth()
@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(204)
  @ApiOperation({
    description: '"adiciona" um item ao carrinho',
    summary: "Adicionar item ao carrinho conforme usuario que esta logado",
  })
  @Post()
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @currentUser() user: any
  ) {
    return this.cartItemService.create(createCartItemDto, user.userId);
  }

  @ApiResponse({
    status: 200,
    description:
      "todos os itens no carrinho do usuario logado retornado com sucesso",
    content: {
      "application/json": {
        example: [
          {
            items: [
              {
                id: "b9c92689-c9d7-41ff-b81a-92abbd55aacb",
                quantity: 1,
                id_variant: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
                productVariant: {
                  id: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
                  price: "170",
                  product: {
                    id: "0f8e161c-aa2f-4f82-bda4-add179abb958",
                    name: "Camisa Polo",
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
                ProductTotalPrice: 170,
              },
            ],
            totalCart: 170,
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({ description: "**Não há itens no carrinho**" })
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    description:
      "Rota para fazer a parte de visualização do carrinho do usuario logado",
    summary: "Listar todos os itens no carrinho do usuario logado",
  })
  @Get("by-current-user")
  findByUser(@currentUser() user: any) {
    console.log("CART BY: ", user);
    return this.cartItemService.findByUser(user.userId);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Item não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "altera um item do carrinho",
    summary: "Alterar um item do carrinho",
  })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @ApiResponse({
    status: 204,
    description: "No Content",
  })
  @ApiNotFoundResponse({ description: "**Item não encontrado**" })
  @HttpCode(204)
  @ApiOperation({
    description: "remove um item do carrinho",
    summary: "Remover item do carrinho",
  })
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.cartItemService.remove(id);
  }
}
