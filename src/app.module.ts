import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { db_database, db_password } from "./constants";
import { db_user } from "./constants";
import { db_host } from "./constants";
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
import { OrderModule } from "./modules/order/order.module";
import { OrderEntity } from "./modules/order/entities/order.entity";
import { OrderVariantModule } from "./modules/order_variant/order_variant.module";
import { OrderVariantEntity } from "./modules/order_variant/entities/order_variant.entity";
import { UserEntity } from "./modules/user/entities/user.entity";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MediaPathConfigModule } from "./configurations/media-path/media-path-config.module";
import { MediaApiModule } from "./modules/media/media/media-api.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: db_database,
      host: db_host,
      username: db_user,
      password: db_password,
      port: 5432,
      entities: [
        UserEntity,
        OrderEntity,
        OrderVariantEntity,
        ProductEntity,
        ProductEntity,
        SizeEntity,
        ColorEntity,
        CartItemEntity,
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
    OrderModule,
    OrderVariantModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    MediaPathConfigModule,
    MediaApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
