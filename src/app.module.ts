import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { db_database, db_password } from '../constants';
import { db_user } from "../constants";
import { db_host } from "../constants";
import { CartItemEntity } from "./modules/cart_item/entities/CartitemEntity.ts";
import { CartEntity } from "./modules/Mcart/entities/cartEntity";
import { ClientEntity } from "./modules/Mclient/entities/clientEntity";
import { ColorEntity } from "./modules/Mcolor/entities/colorEntity";
import { OrderEntity } from "./modules/order/entities/orderEntity";
import { OrderProductEntity } from "./modules/order_product/entities/orderProductEntity";
import { ProductEntity } from "./modules/product/entities/productEntity";
import { SizeEntity } from "./modules/size/entities/sizeEntity";
import { VariantsEntity } from "./modules/variants/entities/variantsEntity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
        database: db_database,
        host: db_host,
        username: db_user,
        password: db_password,
        entities: [ClientEntity, OrderEntity,OrderProductEntity, ProductEntity, VariantsEntity, SizeEntity, ColorEntity, CartItemEntity, CartEntity],
        synchronize: false,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
