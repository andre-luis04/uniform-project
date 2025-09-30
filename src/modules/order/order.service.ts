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
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductVariantsService } from "../product_variant/variants.service";
import { OrderStatus } from "src/enums/status.enum";
import { IsStatus } from "./functions/isStatus";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private cartItemService: CartItemService,
    private eventEmitter: EventEmitter2,
    private readonly productVariantService: ProductVariantsService
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

  async findByUser(idUser: string) {
    const order = await this.orderRepository.find({
      where: { id_user: idUser },
      relations: {
        orderVariant: {
          productVariant: { product: true, color: true, size: true },
        },
      },
      select: {
        orderVariant: {
          id_product_variant: true,
          productVariant: {
            product: { id: true, name: true },
            color: { id: true, color: true },
            size: { id: true, size: true },
            price: true,
          },
          quantity: true,
        },
      },
    });

    const orderWithTotal = order.map((order) => {
      const totalPriceItem = order.orderVariant.map((item) => {
        const quantity = item.quantity;
        const price = item.productVariant.price;

        return {
          totalPrice: quantity * price,
        };
      });
      const orderTotalPrice = totalPriceItem.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return {
        ...order,
        orderTotalPrice,
      };
    });

    return { orderWithTotal };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<void> {
    const order = await this.findOne(id);
    if (!IsStatus(updateOrderDto.status)) {
      throw new BadRequestException("status invalido");
    }
    await this.orderRepository.update(order.id, updateOrderDto);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async finalizeOrder(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        cartItem: true,
      },
    });

    if (!user || user.cartItem.length === 0) {
      throw new BadRequestException("carrinho vazio ou usuario inexistente");
    }

    const order = this.orderRepository.create({
      user: user,
      orderVariant: user.cartItem.map((item) => ({
        id_product_variant: item.id_variant,
        quantity: item.quantity,
      })),
    });

    await Promise.all(
      user.cartItem.map((item) =>
        this.productVariantService.validateStock(item.id_variant, item.quantity)
      )
    );
    await this.orderRepository.save(order);
    await this.cartItemService.removeByCart(user.id);

    this.eventEmitter.emit("order.created", {
      items: order.orderVariant.map((item) => ({
        itemId: item.id_product_variant,
        quantity: item.quantity,
      })),
    });
  }
}
