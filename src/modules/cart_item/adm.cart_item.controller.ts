import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { CartItemService } from "./cart_item.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.decorator";

@ApiTags("Cart item")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("admin/cart-item")
export class AdmCartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiResponse({
    status: 200,
    description: "todos os carrinhos com itens retornados com sucesso",
    content: {
      "application/json": {
        example: [
          {
            created_at: "2025-10-16T16:55:30.557Z",
            updated_at: "2025-10-16T16:55:30.557Z",
            id: "b9c92689-c9d7-41ff-b81a-92abbd55aacb",
            quantity: 1,
            id_user: "906abe3d-bf58-44fd-984f-beb87ec7d256",
            id_variant: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
          },
          {
            created_at: "2025-10-16T17:27:05.557Z",
            updated_at: "2025-10-16T17:27:05.557Z",
            id: "78a03cbd-081a-43b5-865d-5720ffee1e10",
            quantity: 2,
            id_user: "c3a64d56-a084-4e3a-935a-a9e7ae60a228",
            id_variant: "e18c40a8-812e-477a-8b26-4c5e3896be28",
          },
        ],
      },
    },
  })
  @ApiOperation({
    description:
      "Retorna o carrinho de todos os usuarios que possuem itens adicionados ao carrinho",
    summary: "Listar todos os carrinhos com itens no sistema",
  })
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }
}
