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
} from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { currentUser } from "src/decorators/current.user.decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Cart item")
@ApiBearerAuth()
@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @ApiOperation({ description: '"adiciona" um item ao carrinho' })
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @currentUser() user: any
  ) {
    return this.cartItemService.create(createCartItemDto, user.userId);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("by-current-user")
  @ApiOperation({
    description: "busca todos os itens no carrinho do usuario logado",
  })
  findByUser(@currentUser() user: any) {
    console.log("CART BY: ", user);
    return this.cartItemService.findByUser(user.userId);
  }

  @Patch(":id")
  @ApiOperation({ description: "altera um item do carrinho" })
  update(
    @Param("id") id: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(":id")
  @ApiOperation({ description: "remove um item do carrinho" })
  remove(@Param("id") id: string) {
    return this.cartItemService.remove(id);
  }
}
