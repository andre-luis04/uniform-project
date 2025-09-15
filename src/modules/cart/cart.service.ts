import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { CartEntity } from "./entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItemService } from "../cart_item/cart_item.service";
import { CartItemEntity } from "../cart_item/entities/cart_item.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ) {}

  async create(createCartDto: CreateCartDto): Promise<void> {
    const cart = this.cartRepository.create(createCartDto);
    await this.cartRepository.save(cart);
  }

  async findAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }

  async findOne(id: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) throw new NotFoundException("Carrinho não encontrado");
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.update(cart.id, updateCartDto);
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
  }
}
