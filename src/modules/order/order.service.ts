import {
  BadRequestException,
  HttpCode,
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
import { DataSource } from "typeorm";
import { error } from "console";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private cartItemService: CartItemService,
    private eventEmitter: EventEmitter2,
    private readonly productVariantService: ProductVariantsService,
    private dataSource: DataSource
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
      throw new NotFoundException("pedido não encontrado");
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderRepository = queryRunner.manager.getRepository(OrderEntity);
      const order = await orderRepository.findOne({ where: { id } });
      if (!order) throw new NotFoundException("pedido não encontrado");

      if (!IsStatus(updateOrderDto.status)) {
        throw new BadRequestException("status invalido");
      }
      await orderRepository.update(order.id, updateOrderDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async finalizeOrder(userId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userRepository = queryRunner.manager.getRepository(UserEntity);
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: {
          cartItem: true,
        },
      });
      console.log(user?.cartItem.length);

      if (!user || user.cartItem.length === 0) {
        console.log("carrinho vazio");
        throw new BadRequestException("carrinho vazio ou usuario inexistente");
      }

      const orderRepository = queryRunner.manager.getRepository(OrderEntity);

      const order = orderRepository.create({
        user: user,
        orderVariant: user.cartItem.map((item) => ({
          id_product_variant: item.id_variant,
          quantity: item.quantity,
        })),
      });

      await Promise.all(
        user.cartItem.map((item) =>
          this.productVariantService.validateStock(
            item.id_variant,
            item.quantity
          )
        )
      );
      await orderRepository.save(order);
      await this.cartItemService.removeByCart(user.id);

      this.eventEmitter.emit("order.created", {
        items: order.orderVariant.map((item) => ({
          itemId: item.id_product_variant,
          quantity: item.quantity,
        })),
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
