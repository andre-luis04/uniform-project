import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AdmProductController } from "./adm.product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/productEntity";
import { UserProductController } from "./user.product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [AdmProductController, UserProductController],
  providers: [ProductService],
})
export class ProductModule {}
