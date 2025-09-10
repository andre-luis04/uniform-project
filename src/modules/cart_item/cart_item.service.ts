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
    const cartItem = await this.cartItemRepository.create(createCartItemDto);
    await this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItemEntity[]> {
    return await this.cartItemRepository.find();
  }

  async findOneView(id: string): Promise<CartItemEntity> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException("item não encontrado no carrinho");
    }
    return cartItem;
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
}
