import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { CartItemService } from "../cart_item/cart_item.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private cartItemService: CartItemService
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        orderVariant: {
          productVariant: { product: true, color: true, size: true },
        },
      },
      select: {
        orderVariant: {
          id_product_variant: true,
          productVariant: {
            id: true,
            product: { id: true, name: true },
            color: { id: true, color: true },
            size: { id: true, size: true },
            price: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderVariant: { productVariant: { product: true } } },
      select: {
        orderVariant: {
          productVariant: {
            product: { name: true },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException("pedido não enconttrado");
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.update(order.id, updateOrderDto);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async finalizeOrder(userId: string): Promise<void> {
    console.log("FINALIZANDO PEDIDO PARA USUÁRIO:", userId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        cart: {
          cartItem: true,
        },
      },
    });

    if (!user || !user.cart || user.cart.cartItem.length === 0) {
      throw new BadRequestException("carrinho vazio ou usuario inexistente");
    }

    const order = this.orderRepository.create({
      user: user,
      orderVariant: user.cart.cartItem.map((item) => ({
        id_product_variant: item.id_variant,
      })),
    });
    await this.orderRepository.save(order);
    await this.cartItemService.removeByCart(user.cart.id);
  }
}
