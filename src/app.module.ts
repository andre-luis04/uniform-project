import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { db_database, db_password } from "../constants";
import { db_user } from "../constants";
import { db_host } from "../constants";
import { ProductModule } from "./modules/product/product.module";
import { SizeModule } from "./modules/size/size.module";
import { ProductEntity } from "./modules/product/entities/productEntity";
import { SizeEntity } from "./modules/size/entities/size.entity";
import { ColorModule } from "./modules/color/mcolor.module";
import { ColorEntity } from "./modules/color/entities/color.entity";
import { ProductVariantsModule } from "./modules/product_variant/variants.module";
import { ProductVariantEntity } from "./modules/product_variant/entities/product.variant.entity";
import { CartItemModule } from "./modules/cart_item/cart_item.module";
import { CartItemEntity } from "./modules/cart_item/entities/cart_item.entity";
import { CartModule } from "./modules/cart/cart.module";
import { CartEntity } from "./modules/cart/entities/cart.entity";
import { OrderModule } from "./modules/order/order.module";
import { OrderEntity } from "./modules/order/entities/order.entity";
import { OrderVariantModule } from "./modules/order_variant/order_variant.module";
import { OrderVariantEntity } from "./modules/order_variant/entities/order_variant.entity";
import { UserEntity } from "./modules/user/entities/user.entity";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: db_database,
      host: db_host,
      username: db_user,
      password: db_password,
      entities: [
        UserEntity,
        OrderEntity,
        OrderVariantEntity,
        ProductEntity,
        ProductEntity,
        SizeEntity,
        ColorEntity,
        CartItemEntity,
        CartEntity,
        ProductVariantEntity,
      ],
      synchronize: true,
    }),
    ProductModule,
    SizeModule,
    ColorModule,
    ProductVariantsModule,
    UserModule,
    CartItemModule,
    CartModule,
    OrderModule,
    OrderVariantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
