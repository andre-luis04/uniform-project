import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { UserOrderController } from "./user.order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CartItemModule } from "../cart_item/cart_item.module";
import { AdmOrderController } from "./adm.order.controller";
import { OrderListener } from "./listener/order.listener";
import { ProductVariantsModule } from "../product_variant/variants.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity]),
    CartItemModule,
    ProductVariantsModule,
  ],
  controllers: [UserOrderController, AdmOrderController],
  providers: [OrderService, OrderListener],
})
export class OrderModule {}
