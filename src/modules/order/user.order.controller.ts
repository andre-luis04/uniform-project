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
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { UUID } from "crypto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { currentUser } from "src/decorators/current.user.decorator";
import { UserEntity } from "../user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Order")
@ApiBearerAuth()
@Controller("order")
export class UserOrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("finalize")
  @ApiOperation({ description: "rota para finalizar uma compra pelo usuario" })
  finalizeOrder(@currentUser() user: any): Promise<void> {
    return this.orderService.finalizeOrder(user.userId);
  }

   @ApiResponse({
      status: 200,
      description: "pedidos feitos pelo usuario logado retornados com sucesso",
      content: {
        "application/json": {
          example: [
            {
              orderWithTotal: [
                {
                  created_at: "2025-10-16T16:11:44.666Z",
                  updated_at: "2025-10-16T16:11:44.666Z",
                  id: "5636f5f9-2683-43ca-8d3b-778c6d813c07",
                  id_user: "906abe3d-bf58-44fd-984f-beb87ec7d256",
                  status: "pendente",
                  orderVariant: [
                    {
                      id_product_variant: "d025bcd2-3ae0-4417-b5a7-3ae81c17c1c7",
                      quantity: 2,
                      productVariant: {
                        price: "170",
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
                      }
                    }
                  ],
                  orderTotalPrice: 340
                }
              ]
            }
          ],
        },
      },
    }) 
  @UseGuards(AuthGuard("jwt"))
  @Get("by-current-user")
  @ApiOperation({
    description: "encontra todos os pedidos feitos pelo usuario logado",
  })
  findByCurrent(@currentUser() user: any) {
    return this.orderService.findByUser(user.userId);
  }
}
