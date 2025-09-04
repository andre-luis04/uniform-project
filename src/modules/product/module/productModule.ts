import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../entities/productEntity";
import { AdminProductController } from "../controllers/adminProductController";
import { UserProductController } from "../controllers/userProductController";
import { ProductService } from "../services/productServices";
import { ProductRepository } from "../repositories/productRepository";


@Module({
    imports : [TypeOrmModule.forFeature([ProductEntity])],
    providers : [ProductRepository, ProductService],
    controllers : [AdminProductController, UserProductController],
    exports : [ProductRepository],
})
export class ProductModule {}