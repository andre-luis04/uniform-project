import { Module } from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CartItemController } from "./cart_item.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./entities/cart_item.entity";
import { ProductVariantsModule } from "../product_variant/variants.module";

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity]), ProductVariantsModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
