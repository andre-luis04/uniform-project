import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    const order = await this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
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
}
