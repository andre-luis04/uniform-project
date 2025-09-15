import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { CartItemEntity } from "./entities/cart_item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<void> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    await this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItemEntity[]> {
    return await this.cartItemRepository.find();
  }

  async findByCart(
    idCart: string
  ): Promise<{ items: CartItemEntity[]; totalCart: Number }> {
    const cartItem = await this.cartItemRepository.find({
      where: { id_cart: idCart },
      relations: {
        productVariant: { color: true, product: true, size: true },
      },
      select: {
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
    if (!cartItem) {
      throw new NotFoundException("Não há itens no carrinho");
    }

    const cartItemsWithTotal = cartItem.map((item) => {
      const price = Number(item.productVariant.price);
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

  async removeByCart(id_cart: string): Promise<void> {
    const cartItem = await this.cartItemRepository.find({ where: { id_cart } });
    await this.cartItemRepository.remove(cartItem);
  }
}
