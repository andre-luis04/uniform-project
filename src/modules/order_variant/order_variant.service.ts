import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderVariantDto } from "./dto/create-order_variant.dto";
import { UpdateOrderVariantDto } from "./dto/update-order_variant.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderVariantEntity } from "./entities/order_variant.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderVariantService {
  constructor(
    @InjectRepository(OrderVariantEntity)
    private readonly orderVariantRepository: Repository<OrderVariantEntity>
  ) {}

  async create(createOrderVariantDto: CreateOrderVariantDto): Promise<void> {
    const orderVariant = await this.orderVariantRepository.create(
      createOrderVariantDto
    );
    await this.orderVariantRepository.save(orderVariant);
  }

  async findAll(): Promise<OrderVariantEntity[]> {
    return await this.orderVariantRepository.find();
  }

  async findOne(id: string): Promise<OrderVariantEntity> {
    const orderVariant = await this.orderVariantRepository.findOne({
      where: { id },
    });
    if (!orderVariant)
      throw new NotFoundException("pedido-produto não encontrado");
    return orderVariant;
  }

  async update(
    id: string,
    updateOrderVariantDto: UpdateOrderVariantDto
  ): Promise<void> {
    const orderVariant = await this.findOne(id);
    await this.orderVariantRepository.update(
      orderVariant.id,
      updateOrderVariantDto
    );
  }

  async remove(id: string): Promise<void> {
    const orderVariant = await this.findOne(id);
    await this.orderVariantRepository.remove(orderVariant);
  }
}
