import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMcartDto } from "./dto/create-mcart.dto";
import { UpdateMcartDto } from "./dto/update-mcart.dto";
import { CartEntity } from "./entities/mcart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItemService } from "../cart_item/cart_item.service";
import { CartItemEntity } from "../cart_item/entities/cart_item.entity";

@Injectable()
export class McartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartItemService: CartItemService
  ) {}

  async create(createMcartDto: CreateMcartDto): Promise<void> {
    const cart = this.cartRepository.create(createMcartDto);
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

  /*   async findOneView(id: string): Promise<CartItemEntity> {
    const item = this.viewRepository.findOne({where: {id}}) 
  } */

  async update(id: string, updateMcartDto: UpdateMcartDto) {
    return `This action updates a #${id} mcart`;
  }

  async remove(id: string) {
    return `This action removes a #${id} mcart`;
  }
}
