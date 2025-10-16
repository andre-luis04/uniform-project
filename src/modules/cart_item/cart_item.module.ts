import { Module } from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CartItemController } from "./cart_item.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./entities/cart_item.entity";
import { ProductVariantsModule } from "../product_variant/variants.module";
import { AdmCartItemController } from "./adm.cart_item.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity]), ProductVariantsModule],
  controllers: [CartItemController, AdmCartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
