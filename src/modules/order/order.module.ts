import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CartItemModule } from "../cart_item/cart_item.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity]),
    CartItemModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
