import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { CartEntity } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemModule } from "../cart_item/cart_item.module";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartItemModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
