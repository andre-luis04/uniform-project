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
} from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Cart item")
@ApiBearerAuth()
@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }
  @Get("by-cart/:idCart")
  findByCart(@Param("idCart", ParseUUIDPipe) idCart: string) {
    console.log(idCart);
    return this.cartItemService.findByCart(idCart);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartItemService.remove(id);
  }
}
