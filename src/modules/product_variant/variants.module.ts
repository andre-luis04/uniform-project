import { Module } from "@nestjs/common";
import { ProductVariantsService } from "./variants.service";
import { ProductVariantsController } from "./variants.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductVariantEntity } from "./entities/product.variant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantEntity])],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
})
export class ProductVariantsModule {}
