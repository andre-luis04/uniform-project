import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { CartItemEntity } from "./entities/cart_item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductVariantsService } from "../product_variant/variants.service";
import { DataSource } from "typeorm/browser";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly productVariantService: ProductVariantsService,
    private dataSource: DataSource
  ) {}

  async create(
    createCartItemDto: CreateCartItemDto,
    userId: string
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const cartItem = this.cartItemRepository.create({
        id_variant: createCartItemDto.id_variant,
        quantity: createCartItemDto.quantity,
        id_user: userId,
      });

      await this.productVariantService.validateStock(
        createCartItemDto.id_variant,
        createCartItemDto.quantity
      );

      await this.cartItemRepository.save(cartItem);
      queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<CartItemEntity[]> {
    return await this.cartItemRepository.find();
  }

  async findByUser(
    idUser: string
  ): Promise<{ items: CartItemEntity[]; totalCart: Number }> {
    const cartItem = await this.cartItemRepository.find({
      where: { id_user: idUser },
      relations: {
        productVariant: { color: true, product: true, size: true },
      },
      select: {
        id: true,
        id_variant: true,
        productVariant: {
          id: true,
          color: { id: true, color: true },
          product: { id: true, name: true },
          size: { id: true, size: true },
          price: true,
        },
        quantity: true,
      },
    });

    if (cartItem.length === 0) {
      throw new NotFoundException("Não há itens no carrinho");
    }

    const cartItemsWithTotal = cartItem.map((item) => {
      const price = item.productVariant.price;
      const quantity = item.quantity;
      return {
        ...item,
        ProductTotalPrice: price * quantity,
      };
    });

    const cartTotal = cartItemsWithTotal.reduce(
      (sum, item) => sum + item.ProductTotalPrice,
      0
    );

    return {
      items: cartItemsWithTotal,
      totalCart: cartTotal,
    };
  }

  async findOne(id: string): Promise<CartItemEntity> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException("item não encontrado no carrinho");
    }
    return cartItem;
  }

  async update(
    id: string,
    updateCartItemDto: UpdateCartItemDto
  ): Promise<void> {
    const cartItem = await this.findOne(id);
    await this.cartItemRepository.update(cartItem.id, updateCartItemDto);
  }

  async remove(id: string): Promise<void> {
    const cartItem = await this.findOne(id);
    await this.cartItemRepository.remove(cartItem);
  }

  async removeByCart(id_user: string): Promise<void> {
    const cartItem = await this.cartItemRepository.find({ where: { id_user } });
    await this.cartItemRepository.remove(cartItem);
  }
}
